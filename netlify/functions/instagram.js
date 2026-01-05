// Netlify Function: Instagram Media Fetcher
// Instructions:
// 1. Create a Meta/Instagram app and generate a long-lived user token with `user_media` permission.
// 2. Add environment variables in Netlify (Site settings → Build & deploy → Environment):
//    - IG_ACCESS_TOKEN = <your long-lived access token>
//    - IG_USER_ID = <your Instagram user ID from the Graph API>
// 3. Deploy. This function will cache responses for ~30 minutes and return lightweight JSON.

const CACHE_DURATION_MS = 30 * 60 * 1000;
let cache = { timestamp: 0, payload: null };

const formatMedia = (items = []) =>
  items
    .filter((item) => ['IMAGE', 'CAROUSEL_ALBUM'].includes(item.media_type))
    .map((item) => ({
      id: item.id,
      caption: item.caption,
      media_url: item.media_url,
      permalink: item.permalink,
      timestamp: item.timestamp,
    }));

const jsonResponse = (statusCode, body, cached = false) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': cached ? 'public, max-age=1800' : 'no-store',
    'Access-Control-Allow-Origin': '*',
  },
  body: JSON.stringify(body),
});

exports.handler = async () => {
  try {
    const token = process.env.IG_ACCESS_TOKEN;
    const userId = process.env.IG_USER_ID;

    if (cache.payload && Date.now() - cache.timestamp < CACHE_DURATION_MS) {
      return jsonResponse(200, cache.payload, true);
    }

    if (!token || !userId) {
      return jsonResponse(200, {
        media: [],
        error: 'Instagram not configured yet. Add IG_ACCESS_TOKEN and IG_USER_ID environment variables.',
      });
    }

    const fields = 'id,caption,media_url,permalink,timestamp,media_type';
    const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&access_token=${token}&limit=24`;

    const response = await fetch(url);
    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Instagram API error: ${message}`);
    }

    const json = await response.json();
    const payload = { media: formatMedia(json.data) };
    cache = { timestamp: Date.now(), payload };

    return jsonResponse(200, payload, true);
  } catch (error) {
    return jsonResponse(200, { media: [], error: error.message });
  }
};
