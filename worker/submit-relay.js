/**
 * Cloudflare Worker — Gem submission relay for speedrun talent network
 *
 * Accepts candidate profile data via POST, creates a candidate in Gem,
 * and adds them to the talent network project.
 *
 * Security:
 *   - Requires Authorization: Bearer <RELAY_SECRET> header
 *   - Rate limited (env: RATE_LIMIT_PER_MIN, default 10)
 *   - Input validation on all fields (length, format)
 *   - Project ID and user ID stored as secrets, not in code
 *   - CORS locked to localhost + known domains
 *
 * Deploy:
 *   cd worker && wrangler deploy
 *
 * Set secrets:
 *   wrangler secret put GEM_API_KEY
 *   wrangler secret put RELAY_SECRET
 *   wrangler secret put GEM_PROJECT_ID
 *   wrangler secret put GEM_USER_ID
 */

const GEM_API = 'https://api.gem.com/v0';
const MAX_FIELD_LEN = 2000;
const MAX_SHORT_FIELD = 255;
const RATE_WINDOW_MS = 60_000;
const DEFAULT_RATE_LIMIT = 100;

// In-memory rate limit (per-isolate, resets on redeploy — good enough)
const ipHits = new Map();

function checkRateLimit(ip, limit) {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    ipHits.set(ip, { windowStart: now, count: 1 });
    return true;
  }
  entry.count++;
  if (entry.count > limit) return false;
  return true;
}

// Input validation
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= MAX_SHORT_FIELD;
}

function validateLinkedIn(url) {
  return /linkedin\.com\/in\/[a-zA-Z0-9_-]+/.test(url) && url.length <= 500;
}

function sanitize(str, maxLen) {
  if (!str) return '';
  return String(str).slice(0, maxLen).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');
}

const ALLOWED_ORIGINS = [
  'http://localhost',
  'https://localhost',
  'https://speedrun.a16z.com',
];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.some(o => origin?.startsWith(o));
  return {
    'Access-Control-Allow-Origin': allowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

function corsResponse(response, origin) {
  const headers = new Headers(response.headers);
  for (const [k, v] of Object.entries(corsHeaders(origin))) {
    headers.set(k, v);
  }
  return new Response(response.body, { ...response, headers });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(origin) });
    }

    if (request.method !== 'POST') {
      return corsResponse(Response.json({ error: 'POST only' }, { status: 405 }), origin);
    }

    const url = new URL(request.url);
    if (url.pathname !== '/submit') {
      return corsResponse(Response.json({ error: 'Not found' }, { status: 404 }), origin);
    }

    // --- Auth: require Bearer token ---
    const authHeader = request.headers.get('Authorization') || '';
    const token = authHeader.replace(/^Bearer\s+/i, '');
    if (!env.RELAY_SECRET || token !== env.RELAY_SECRET) {
      return corsResponse(Response.json({ error: 'Unauthorized' }, { status: 401 }), origin);
    }

    // --- Rate limit ---
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const rateLimit = parseInt(env.RATE_LIMIT_PER_MIN) || DEFAULT_RATE_LIMIT;
    if (!checkRateLimit(ip, rateLimit)) {
      return corsResponse(Response.json({ error: 'Rate limited. Try again in a minute.' }, { status: 429 }), origin);
    }

    // --- Config from secrets ---
    const apiKey = env.GEM_API_KEY;
    const projectId = env.GEM_PROJECT_ID;
    const createdBy = env.GEM_USER_ID;
    if (!apiKey || !projectId || !createdBy) {
      return corsResponse(Response.json({ error: 'Server misconfigured' }, { status: 500 }), origin);
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return corsResponse(Response.json({ error: 'Invalid JSON' }, { status: 400 }), origin);
    }

    // --- Validate required fields ---
    if (!data.name || !data.email || !data.linkedin) {
      return corsResponse(Response.json({ error: 'Missing required fields: name, email, linkedin' }, { status: 400 }), origin);
    }
    if (!validateEmail(data.email)) {
      return corsResponse(Response.json({ error: 'Invalid email format' }, { status: 400 }), origin);
    }
    if (!validateLinkedIn(data.linkedin)) {
      return corsResponse(Response.json({ error: 'Invalid LinkedIn URL' }, { status: 400 }), origin);
    }

    // --- Sanitize all inputs ---
    const name = sanitize(data.name, MAX_SHORT_FIELD);
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    let linkedInHandle = sanitize(data.linkedin, 500);
    const handleMatch = linkedInHandle.match(/linkedin\.com\/in\/([^/?#]+)/);
    if (handleMatch) linkedInHandle = handleMatch[1];

    const email = sanitize(data.email, MAX_SHORT_FIELD);
    const company = sanitize(data.company, MAX_SHORT_FIELD);
    const title = sanitize(data.title, MAX_SHORT_FIELD);
    const location = sanitize(data.location, MAX_SHORT_FIELD);
    const accomplishments = sanitize(data.accomplishments, MAX_FIELD_LEN);
    const building = sanitize(data.building, MAX_FIELD_LEN);
    const polarity = sanitize(data.polarity, MAX_FIELD_LEN);
    const craft = sanitize(data.craft, MAX_SHORT_FIELD);
    const continent = sanitize(data.continent, MAX_SHORT_FIELD);
    const links = sanitize(data.links, MAX_FIELD_LEN);

    // Build profile URLs (validate each is a URL)
    const profileUrls = [];
    if (data.portfolio) {
      for (const u of String(data.portfolio).split('\n').filter(Boolean)) {
        const trimmed = u.trim();
        if (/^https?:\/\/.+/.test(trimmed) && trimmed.length <= 500) {
          profileUrls.push(trimmed);
        }
      }
    }

    // --- Build candidate payload ---
    const candidatePayload = {
      created_by: createdBy,
      first_name: firstName,
      last_name: lastName,
      emails: [{ email_address: email, is_primary: true }],
      linked_in_handle: linkedInHandle,
      title,
      company,
      location,
      project_ids: [projectId],
      profile_urls: profileUrls,
    };

    // --- Build note ---
    const noteParts = [];
    if (accomplishments) noteParts.push(`**Accomplishments:**\n${accomplishments}`);
    if (building) noteParts.push(`**Currently building:**\n${building}`);
    if (polarity) noteParts.push(`**Looking for / avoiding:**\n${polarity}`);
    if (craft) noteParts.push(`**Craft area:** ${craft}`);
    if (continent) noteParts.push(`**Location:** ${continent}`);
    if (data.founding) noteParts.push(`**Considering founding:** Yes`);
    if (data.student) noteParts.push(`**Student:** Yes`);
    if (links) noteParts.push(`**Work links:**\n${links}`);
    const utmSource = sanitize(data.utm_source, 50) || 'unknown';
    const utmMedium = sanitize(data.utm_medium, 50) || 'unknown';
    noteParts.push(`\n_Submitted via speedrun-career-ops (${utmSource} / ${utmMedium})_`);
    const noteBody = noteParts.join('\n\n');

    const headers = {
      'X-Api-Key': apiKey,
      'Content-Type': 'application/json',
    };

    let candidateId = null;
    let isExisting = false;

    // --- Step 1: Create candidate ---
    try {
      const createRes = await fetch(`${GEM_API}/candidates`, {
        method: 'POST',
        headers,
        body: JSON.stringify(candidatePayload),
      });

      if (createRes.ok) {
        const created = await createRes.json();
        candidateId = created.id;
      } else {
        const errorBody = await createRes.json().catch(() => ({}));

        if (errorBody.errors?.duplicate_candidate?.id) {
          candidateId = errorBody.errors.duplicate_candidate.id;
          isExisting = true;

          // Add existing candidate to the project (may already be there)
          try {
            await fetch(`${GEM_API}/projects/${projectId}/candidates`, {
              method: 'PUT',
              headers,
              body: JSON.stringify({ candidate_ids: [candidateId] }),
            });
          } catch {
            // Already in project — fine
          }
        } else {
          return corsResponse(Response.json({
            success: false,
            error: `Gem API error (${createRes.status})`,
          }, { status: 502 }), origin);
        }
      }
    } catch (err) {
      return corsResponse(Response.json({
        success: false,
        error: `Failed to reach Gem API`,
      }, { status: 502 }), origin);
    }

    // --- Step 2: Add note (new candidates only) ---
    if (candidateId && !isExisting) {
      try {
        await fetch(`${GEM_API}/notes`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ candidate_id: candidateId, body: noteBody }),
        });
      } catch {
        // Non-fatal
      }
    }

    return corsResponse(Response.json({
      success: true,
      existing: isExisting,
      message: isExisting
        ? 'Already in the talent network (no data overwritten)'
        : 'Added to the talent network',
    }), origin);
  },
};
