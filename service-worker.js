self.addEventListener('install', function(event) {
  console.log('Service Worker: Installed');
  event.waitUntil(
    caches
      .open('v1')
      .then(function(cache) {
        return cache.addAll([
          '/index.html',
          '/dist/css/style.css',
          '/dist/js/vendor.js',
          '/dist/js/bundle.js',
          '/dist/img/favicon.ico'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker: Active');
});

self.addEventListener('fetch', function(event) {
  console.log('Service Worker: Fetch');
});
