var staticCacheName = 'spedoPWA-v4',
  filesToCache = [
    './index.html',
    './js/auth.js',
    './js/getDistanceInMeters.js',
    './js/initialize.js',
    './js/lib.js',
    './js/main.js',
    './js/swregister.js',
    './css/loader.css',
    './css/main.css',
    './manifest.json',
    './icons/user.svg',
    './icons/check-circle.svg',
    './icons/x-circle.svg',
    './icons/x.svg',
    './icons/cloud.svg',
    './icons/cloud-off.svg',
    './icons/download.svg'
  ]

function precache() {
  return caches.open(staticCacheName).then(cache => {
    return cache.addAll(filesToCache)
  }).catch(e => console.log(e))
}

self.addEventListener('install', event => {
  self.skipWaiting()
  event.waitUntil(precache())
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('spedoPWA-') && cacheName != staticCacheName
        }).map(cacheName => {
          return caches.delete(cacheName)
        })
      )
    }).catch(e => console.log(e))
  )
})

function update(request) {
  return caches.open(staticCacheName).then(cache => {
    return fetch(request).then(response => {
      return cache.put(request, response)
    }).catch(e => console.log(e))
  }).catch(e => console.log(e))
}

function fromNetwork(request, timeout) {
  return new Promise((fulfill, reject) => {
    var timeoutId = setTimeout(reject, timeout)
    fetch(request).then(response => {
      clearTimeout(timeoutId)
      fulfill(response)
    }, reject)
  })
}

function fromCache(request) {
  return caches.open(staticCacheName).then(cache => {
    return cache.match(request).then(matching => {
      return matching || fromNetwork(request, 1000)
    }).catch(e => console.log(e))
  }).catch(e => console.log(e))
}

//For responding cache first
self.addEventListener('fetch', evt => {
  evt.respondWith(fromCache(evt.request))
  evt.waitUntil(update(evt.request))
})

// For responding with network first
// self.addEventListener('fetch', evt => {
//   evt.respondWith(fromNetwork(evt.request, 1000).catch(() => {
//     return fromCache(evt.request)
//   }))
// })
