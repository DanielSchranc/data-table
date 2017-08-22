function ServiceWorkerService() {

  this.checkServiceWorker = function() {
    if ('serviceWorker' in navigator) {
      //navigator.serviceWorker.register('/service-worker.js');
      return true;
    }
    return false;
  }

  this.registerWorker = function(worker) {
    navigator
      .serviceWorker
      .register(worker)
      .then(function(register) {
        if (register.installing) {
          console.log('Service worker installing');
        } else if (register.waiting) {
          console.log('Service worker installed');
        } else if (register.active) {
          console.log('Service worker active');
        }
      })
      .catch(function(error) {
        console.log('Registration failed with ' + error);
      });
  }

}

angular
  .module('common.sw')
  .service('ServiceWorkerService', ServiceWorkerService);
