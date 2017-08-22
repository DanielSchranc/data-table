function ServiceWorkerController(ServiceWorkerService) {
  var ctrl = this;

  function registerAppInSW() {
    if (ServiceWorkerService.checkServiceWorker) {
     ServiceWorkerService
      .registerWorker('sw/service-worker.js');
    }
  }

  registerAppInSW();
}

angular
  .module('common.sw')
  .controller('ServiceWorkerController', ServiceWorkerController);