var cacheName = 'hello-pwa';
var filesToCache = [
  './',
  './index.html',
  './css/grid.css',
  './js/main.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

// 1. Nowa metoda w SW
self.addEventListener('push', (event) => {
    // 2. Sprawdź wiadomośc z serwera i sparsuj do tekstu
    console.log('Otrzymałem nowe dane z serwera:', event.data.text())
    // 3. Stwórz tytuł i treśc notyfikacji. Uzyj danych z serwera
    const message = {
        data: event.data.text()
    }
    const title = 'Niesamowita sprawa!';

    // 4. Stwórz notyfikację
    const promiseChain = self.registration.showNotification(title, message);
    // 5. Wywołaj notyfikację
    event.waitUntil(promiseChain);
})
