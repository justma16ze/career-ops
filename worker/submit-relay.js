/**
 * Cloudflare Worker — Typeform submission relay
 *
 * Accepts candidate profile data via POST, submits to both Typeform forms
 * using the API token stored as a Worker secret. Candidates never see the token.
 *
 * Deploy:
 *   wrangler deploy
 *
 * Set the secret:
 *   wrangler secret put TYPEFORM_API_TOKEN
 *
 * Usage from client:
 *   POST https://speedrun-submit.{your-account}.workers.dev/submit
 *   Content-Type: application/json
 *   { "name": "...", "email": "...", ... }
 */

const FORM_1_ID = 'uPI8kFOI';
const FORM_2_ID = 'b20t87QG';
const TYPEFORM_API = 'https://api.typeform.com/forms';

// Field IDs for Form 1
const F1 = {
  name: 'rkHeeArW7PDU',
  email: 'HKVthMkkRLQk',
  continent: '3ZTk5sqctphv',
  company: 'mV4hg87t8S4f',
  craft: 'VEyQKH7UYskQ',
  linkedin: 'wBX4vKFEmLqE',
  portfolio: 'ic8VO3B87e70',
  founding: '3yqoZ2Mxs5g3',
  newsletter: 'RhyuBygr1NLQ',
  student: 'yQlRIF6VyqDl',
  graduation: 'FWr3P9clodBZ',
  arrangements: 'ezV8eTAcNT33',
};

// Field IDs for Form 2
const F2 = {
  accomplishments: 'gUYw7B0aIIGD',
  building: 'DAFKLNfGSs6n',
  polarity: 'Q4sPPUqqUakP',
  links: 'RbrYXjlY81d1',
};

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
      return Response.json({ error: 'POST only' }, { status: 405 });
    }

    const url = new URL(request.url);
    if (url.pathname !== '/submit') {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const token = env.TYPEFORM_API_TOKEN;
    if (!token) {
      return Response.json({ error: 'Server misconfigured — no API token' }, { status: 500 });
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return Response.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    // Validate required fields
    if (!data.name || !data.email || !data.linkedin) {
      return Response.json({ error: 'Missing required fields: name, email, linkedin' }, { status: 400 });
    }

    const results = { form1: null, form2: null };

    // --- Submit Form 1 ---
    try {
      const answers = [
        { field: { id: F1.name, type: 'short_text' }, type: 'text', text: data.name },
        { field: { id: F1.email, type: 'email' }, type: 'email', email: data.email },
        { field: { id: F1.company, type: 'short_text' }, type: 'text', text: data.company || '' },
        { field: { id: F1.linkedin, type: 'url' }, type: 'url', url: data.linkedin },
        { field: { id: F1.portfolio, type: 'long_text' }, type: 'text', text: data.portfolio || '' },
        { field: { id: F1.founding, type: 'yes_no' }, type: 'boolean', boolean: !!data.founding },
        { field: { id: F1.newsletter, type: 'yes_no' }, type: 'boolean', boolean: data.newsletter !== false },
        { field: { id: F1.student, type: 'yes_no' }, type: 'boolean', boolean: !!data.student },
      ];

      if (data.continent) {
        answers.push({ field: { id: F1.continent, type: 'multiple_choice' }, type: 'choice', choice: { label: data.continent } });
      }
      if (data.craft) {
        answers.push({ field: { id: F1.craft, type: 'multiple_choice' }, type: 'choice', choice: { label: data.craft } });
      }
      if (data.student && data.graduation) {
        answers.push({ field: { id: F1.graduation, type: 'date' }, type: 'date', date: data.graduation });
      }
      if (data.student && data.arrangements) {
        answers.push({ field: { id: F1.arrangements, type: 'multiple_choice' }, type: 'choice', choice: { label: data.arrangements } });
      }

      const res1 = await fetch(`${TYPEFORM_API}/${FORM_1_ID}/responses`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          hidden: {
            utm_source: data.utm_source || 'speedrun-career-ops',
            utm_medium: data.utm_medium || 'relay-submit',
          },
        }),
      });

      results.form1 = { status: res1.status, ok: res1.ok };
      if (!res1.ok) {
        results.form1.error = await res1.text();
      }
    } catch (err) {
      results.form1 = { ok: false, error: err.message };
    }

    // --- Submit Form 2 ---
    try {
      const answers2 = [
        { field: { id: F2.accomplishments, type: 'long_text' }, type: 'text', text: data.accomplishments || '' },
        { field: { id: F2.building, type: 'long_text' }, type: 'text', text: data.building || '' },
        { field: { id: F2.polarity, type: 'long_text' }, type: 'text', text: data.polarity || '' },
        { field: { id: F2.links, type: 'long_text' }, type: 'text', text: data.links || '' },
      ];

      const res2 = await fetch(`${TYPEFORM_API}/${FORM_2_ID}/responses`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: answers2,
          hidden: { email: data.email },
        }),
      });

      results.form2 = { status: res2.status, ok: res2.ok };
      if (!res2.ok) {
        results.form2.error = await res2.text();
      }
    } catch (err) {
      results.form2 = { ok: false, error: err.message };
    }

    const allOk = results.form1?.ok && results.form2?.ok;

    return Response.json(
      { success: allOk, results },
      {
        status: allOk ? 200 : 207,
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
    );
  },
};
