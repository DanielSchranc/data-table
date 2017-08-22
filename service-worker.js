self.addEventListener('install', function(event) {
  event.waitUntil(
    caches
    .open('v1')
    .then(function(cache) {
      return cache.addAll([
        '/data-table/',
        '/data-table/index.html',
        '/data-table/dist/css/style.css',
        '/data-table/dist/js/vendor.js',
        '/data-table/dist/js/bundle.js',
        '/data-table/dist/img/favicon.ico'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches
    .match(event.request)
    .then(function(response) {
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request).then(function(response) {
          return response;
        })
        .catch(function() {
          return caches.match('/data-table/dist/img/favicon.ico');
        });
      }
    })
  );
});
