if (!self.define) {
  let e,
    s = {};
  const n = (n, i) => (
    (n = new URL(n + '.js', i).href),
    s[n] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = n), (e.onload = s), document.head.appendChild(e);
        } else (e = n), importScripts(n), s();
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, c) => {
    const t = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[t]) return;
    let a = {};
    const o = (e) => n(e, t),
      r = { module: { uri: t }, exports: a, require: o };
    s[t] = Promise.all(i.map((e) => r[e] || o(e))).then((e) => (c(...e), a));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: 'fb4ec43399484329e485402186b00d1d' },
        { url: '/_next/static/Hy3kWNuALwqUht8ioJ1rk/_buildManifest.js', revision: '15deffd4592cf72d07b13fe0c57cf0f3' },
        { url: '/_next/static/Hy3kWNuALwqUht8ioJ1rk/_ssgManifest.js', revision: 'b6652df95db52feb4daf4eca35380933' },
        { url: '/_next/static/chunks/4bd1b696-ca0cc4f89d32cd7e.js', revision: 'Hy3kWNuALwqUht8ioJ1rk' },
        { url: '/_next/static/chunks/684-2c88d8a8372b1c82.js', revision: 'Hy3kWNuALwqUht8ioJ1rk' },
        { url: '/_next/static/chunks/727-8383b182d198b842.js', revision: 'Hy3kWNuALwqUht8ioJ1rk' },
        { url: '/_next/static/chunks/766-2d28c6d1feb09980.js', revision: 'Hy3kWNuALwqUht8ioJ1rk' },
        { url: '/_next/static/chunks/905-7b05ecbe9b2931f0.js', revision: 'Hy3kWNuALwqUht8ioJ1rk' },
        { url: '/_next/static/chunks/app/_not-found/page-e9bcf1a1014963d7.js', revision: 'Hy3kWNuALwqUht8ioJ1rk' },
        { url: '/_next/static/chunks/app/about/page-d208552de7eb49ec.js', revision: 'Hy3kWNuALwqUht8ioJ1rk' },
        {
          url: '/_next/static/chunks/app/book/%5BbookId%5D/chapter/%5BchapterIndex%5D/page-f93bc9895d686882.js',
          revision: 'Hy3kWNuALwqUht8ioJ1rk',
        },
        {
          url: '/_next/static/chunks/app/book/%5BbookId%5D/page-9b9f0e4c371611b4.js',
          revision: 'Hy3kWNuALwqUht8ioJ1rk',
        },
        { url: '/_next/static/chunks/app/faq/page-6456e0626e5b7cd5.js', revision: 'Hy3kWNuALwqUht8ioJ1rk' },
        { url: '/_next/static/chunks/app/layout-8459a3d725ba4a19.js', revision: 'Hy3kWNuALwqUht8ioJ1rk' },
        { url: '/_next/static/chunks/app/page-3136cbae767ffbf7.js', revision: 'Hy3kWNuALwqUht8ioJ1rk' },
        { url: '/_next/static/chunks/ee560e2c-13e5312bc1a0c03d.js', revision: 'Hy3kWNuALwqUht8ioJ1rk' },
        { url: '/_next/static/chunks/f788f2b5.9f04ca0e3cf904e1.js', revision: '9f04ca0e3cf904e1' },
        { url: '/_next/static/chunks/framework-f593a28cde54158e.js', revision: 'Hy3kWNuALwqUht8ioJ1rk' },
        { url: '/_next/static/chunks/main-app-3510cc80c9b93ee8.js', revision: 'Hy3kWNuALwqUht8ioJ1rk' },
        { url: '/_next/static/chunks/main-f052565ca6d268f3.js', revision: 'Hy3kWNuALwqUht8ioJ1rk' },
        { url: '/_next/static/chunks/pages/_app-da15c11dea942c36.js', revision: 'Hy3kWNuALwqUht8ioJ1rk' },
        { url: '/_next/static/chunks/pages/_error-cc3f077a18ea1793.js', revision: 'Hy3kWNuALwqUht8ioJ1rk' },
        { url: '/_next/static/chunks/polyfills-42372ed130431b0a.js', revision: '846118c33b2c0e922d7b3a7676f81f6f' },
        { url: '/_next/static/chunks/webpack-26196882c7dace77.js', revision: 'Hy3kWNuALwqUht8ioJ1rk' },
        { url: '/_next/static/css/a3ef954c98c82e4e.css', revision: 'a3ef954c98c82e4e' },
        { url: '/icons/generate-icons.js', revision: '70eacb9b0c5f505d993eb85c42132564' },
        { url: '/icons/icon-128x128.png', revision: 'a792b9a37cd7c999225b34791c572fea' },
        { url: '/icons/icon-144x144.png', revision: 'bcd5b73ec98827c7bcaa902ccd343428' },
        { url: '/icons/icon-152x152.png', revision: '46fad02fcdf5a862f0b8371f5661051b' },
        { url: '/icons/icon-192x192.png', revision: '2323563e71d1b041e72eb593352b0bb3' },
        { url: '/icons/icon-384x384.png', revision: 'd5b07c6e169d63a195213a0a1b208d6b' },
        { url: '/icons/icon-512x512.png', revision: '794515e5ba05e73c1a81b74f669f0544' },
        { url: '/icons/icon-72x72.png', revision: '79058b0fee6a0ef89fe60224daaecb46' },
        { url: '/icons/icon-96x96.png', revision: '738a385a0c8618a9c8d6fa0c58be4d3b' },
        { url: '/icons/icon-maskable-512x512.png', revision: '794515e5ba05e73c1a81b74f669f0544' },
        { url: '/images/book-cover.png', revision: '6a57486569907c7c3889646db88d43ce' },
        { url: '/images/logo.png', revision: '6a57486569907c7c3889646db88d43ce' },
        { url: '/manifest.json', revision: '48fdb6d03c96a42c75856b3d0d23d6f2' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: n, state: i }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
                : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET'
    );
});
