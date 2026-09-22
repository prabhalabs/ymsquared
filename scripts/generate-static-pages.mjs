// Prerenders select routes to static HTML files inside dist/ after the
// normal Vite client build, so hosts with no server-side rewrites (GitHub
// Pages) can serve them directly with a real HTTP 200 — instead of relying
// on the public/404.html + index.html SPA-fallback redirect, which returns
// a real 404 status to crawlers that don't execute the redirect's JS
// (e.g. Google Play's Privacy Policy URL validator).
//
// Each entry's HTML is produced by actually rendering the corresponding
// Vue route via src/entry-server.ts, so the static page can never drift
// from what the SPA itself renders.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { createServer } from 'vite'

const ROOT = path.resolve(import.meta.dirname, '..')
const DIST = path.join(ROOT, 'dist')

const STATIC_ROUTES = [
  {
    url: '/privacy',
    outFile: 'privacy/index.html',
    title: 'Privacy Policy — YM² — Your Money Matters',
    canonicalPath: '/privacy',
  },
]

async function main() {
  const shellHtml = await readFile(path.join(DIST, 'index.html'), 'utf-8')

  const vite = await createServer({
    root: ROOT,
    appType: 'custom',
    server: { middlewareMode: true },
  })

  try {
    const { renderRoute } = await vite.ssrLoadModule('/src/entry-server.ts')

    for (const route of STATIC_ROUTES) {
      const appHtml = await renderRoute(route.url)

      let html = shellHtml.replace('<div id="app"></div>', `<div id="app">${appHtml}</div>`)
      html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
      html = html.replace(
        /<link rel="canonical" href="[^"]*" \/>/,
        `<link rel="canonical" href="https://prabhalabs.github.io/ymsquared${route.canonicalPath}/" />`,
      )

      const outPath = path.join(DIST, route.outFile)
      await mkdir(path.dirname(outPath), { recursive: true })
      await writeFile(outPath, html)
      console.log(`Prerendered ${route.url} -> dist/${route.outFile}`)
    }
  } finally {
    await vite.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
