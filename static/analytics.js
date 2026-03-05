const CWA_API = 'https://cloudflareinsights.com/cdn-cgi/rum'
const CWA_SCRIPT = 'https://static.cloudflareinsights.com/beacon.min.js'

export default {
  async fetch(request, env, ctx) {
    let { pathname, search } = new URL(request.url)
    if (pathname.endsWith('.js')) {
      let response = await caches.default.match(request)
      if (!response) {
          response = await fetch(CWA_SCRIPT, request)
          ctx.waitUntil(caches.default.put(request, response.clone()))
      }
      return response
    }
    const req = new Request(request)
    req.headers.delete("cookie")
    const response = await fetch(`${CWA_API}${search}`, req)
    const headers = Object.fromEntries(response.headers.entries())
    if (!response.headers.has('Access-Control-Allow-Origin')) {
      headers['Access-Control-Allow-Origin'] = request.headers.get('Origin') || '*'
    }
    if (!response.headers.has('Access-Control-Allow-Headers')) {
      headers['Access-Control-Allow-Headers'] = 'content-type'
    }
    if (!response.headers.has('Access-Control-Allow-Credentials')) {
      headers['Access-Control-Allow-Credentials'] = 'true'
    }
    return new Response(response.body, {
      status: response.status,
      headers
    })
  },
};
