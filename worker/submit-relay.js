/**
 * Cloudflare Worker — Gem submission relay for speedrun talent network
 *
 * Accepts candidate profile data via POST, creates a candidate in Gem,
 * and adds them to the "Typeform Submissions" project.
 *
 * Deduplication: Gem deduplicates on linked_in_handle automatically.
 * If a candidate with that LinkedIn already exists, we get a 400 with
 * the existing candidate ID — we then add THAT candidate to the project
 * instead (no data overwritten).
 *
 * Deploy:
 *   cd worker && wrangler deploy
 *
 * Set secrets:
 *   wrangler secret put GEM_API_KEY
 *
 * Usage:
 *   POST /submit { name, email, linkedin, ... }
 */

const GEM_API = 'https://api.gem.com/v0';
const PROJECT_ID = 'UHJvamVjdDoxMDM1MjE0'; // "Typeform Submissions"
const CREATED_BY = 'dXNlcnM6NjU2NzMx';     // Jordan Mazer

export default {
  async fetch(request, env) {
    // CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return cors(Response.json({ error: 'POST only' }, { status: 405 }));
    }

    const url = new URL(request.url);
    if (url.pathname !== '/submit') {
      return cors(Response.json({ error: 'Not found' }, { status: 404 }));
    }

    const apiKey = env.GEM_API_KEY;
    if (!apiKey) {
      return cors(Response.json({ error: 'Server misconfigured — no GEM_API_KEY' }, { status: 500 }));
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return cors(Response.json({ error: 'Invalid JSON' }, { status: 400 }));
    }

    // Validate required fields
    if (!data.name || !data.email || !data.linkedin) {
      return cors(Response.json({ error: 'Missing required fields: name, email, linkedin' }, { status: 400 }));
    }

    // Parse name into first/last
    const nameParts = data.name.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    // Extract LinkedIn handle from URL
    let linkedInHandle = data.linkedin;
    const handleMatch = linkedInHandle.match(/linkedin\.com\/in\/([^/?#]+)/);
    if (handleMatch) linkedInHandle = handleMatch[1];

    // Build candidate payload
    const candidatePayload = {
      created_by: CREATED_BY,
      first_name: firstName,
      last_name: lastName,
      emails: [{ email_address: data.email, is_primary: true }],
      linked_in_handle: linkedInHandle,
      title: data.title || '',
      company: data.company || '',
      location: data.location || '',
      project_ids: [PROJECT_ID],
      profile_urls: [],
    };

    // Add portfolio/GitHub as profile URLs
    if (data.portfolio) {
      for (const url of data.portfolio.split('\n').filter(Boolean)) {
        candidatePayload.profile_urls.push(url.trim());
      }
    }

    // Build notes with the rich data (accomplishments, polarity, etc.)
    const noteParts = [];
    if (data.accomplishments) noteParts.push(`**Accomplishments:**\n${data.accomplishments}`);
    if (data.building) noteParts.push(`**Currently building:**\n${data.building}`);
    if (data.polarity) noteParts.push(`**Looking for / avoiding:**\n${data.polarity}`);
    if (data.craft) noteParts.push(`**Craft area:** ${data.craft}`);
    if (data.continent) noteParts.push(`**Location:** ${data.continent}`);
    if (data.founding) noteParts.push(`**Considering founding:** Yes`);
    if (data.student) noteParts.push(`**Student:** Yes`);
    if (data.links) noteParts.push(`**Work links:**\n${data.links}`);
    noteParts.push(`\n_Submitted via speedrun-career-ops (${data.utm_source || 'unknown'} / ${data.utm_medium || 'unknown'})_`);
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

        // Check if it's a duplicate (candidate already exists)
        if (errorBody.errors?.duplicate_candidate?.id) {
          candidateId = errorBody.errors.duplicate_candidate.id;
          isExisting = true;

          // Add existing candidate to the project (they might not be in it yet)
          try {
            await fetch(`${GEM_API}/projects/${PROJECT_ID}/candidates`, {
              method: 'PUT',
              headers,
              body: JSON.stringify({ candidate_ids: [candidateId] }),
            });
          } catch {
            // May already be in project — that's fine
          }
        } else {
          return cors(Response.json({
            success: false,
            error: `Gem API error (${createRes.status})`,
            details: errorBody,
          }, { status: 502 }));
        }
      }
    } catch (err) {
      return cors(Response.json({
        success: false,
        error: `Failed to reach Gem API: ${err.message}`,
      }, { status: 502 }));
    }

    // --- Step 2: Add a note with the rich profile data ---
    // Only add note for new candidates (don't overwrite/duplicate notes for existing ones)
    if (candidateId && !isExisting) {
      try {
        await fetch(`${GEM_API}/notes`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            candidate_id: candidateId,
            body: noteBody,
          }),
        });
      } catch {
        // Note failure is non-fatal
      }
    }

    return cors(Response.json({
      success: true,
      candidate_id: candidateId,
      existing: isExisting,
      message: isExisting
        ? 'Candidate already exists in Gem — added to project (no data overwritten)'
        : 'Candidate created and added to Typeform Submissions project',
    }));
  },
};

function cors(response) {
  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', '*');
  return new Response(response.body, { ...response, headers });
}
