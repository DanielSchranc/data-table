self.addEventListener('install', function(event) {
  console.log('Service Worker: Installed');
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

self.addEventListener('activate', function(event) {
  console.log('Service Worker: Active');
});

self.addEventListener('fetch', function(event) {
  console.log('Service Worker: Fetch');
});
