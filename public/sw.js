var staticCacheName = 'spedoPWA-v7',
  filesToCache = [
    'index.html',
    'js/*',
    'css/*',
    'manifest.json'
  ]

function precache() {
  return caches.open(staticCacheName).then(function(cache) {
    return cache.addAll(filesToCache)
  }).catch(e => console.log(e))
}

self.addEventListener('install', function(event) {
  console.log('Installing Service Worker')
  event.waitUntil(precache())
})

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('spedoPWA-') && cacheName != staticCacheName
        }).map(function(cacheName) {
          return caches.delete(cacheName)
        })
      )
    })
  )
})

function fromCache(request) {
  return caches.open(staticCacheName).then(function (cache) {
    return cache.match(request).then(function (matching) {
      console.log(request)
      return matching || Promise.reject(`no-match ${request}`);
    });
  });
}

function fromNetwork(request, timeout) {
  return new Promise(function (fulfill, reject) {
    var timeoutId = setTimeout(reject, timeout)

    fetch(request).then(function (response) {
      clearTimeout(timeoutId)
      console.log(request)
      console.log(`from network ${request}`)
      fulfill(response)
    }, reject)
  })
}

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.')
  evt.respondWith(fromNetwork(evt.request, 400).catch(function () {
  console.log(request)
    console.log(`from cache ${request}`)
    return fromCache(evt.request)
  }))
})
