function CallcenterTableController(CallcenterService, StorageService) {
  var ctrl = this;
  ctrl.data = [];

  if (navigator.onLine) {
    CallcenterService
      .getEmergencyCalls()
      .then(function(response) {
        ctrl.data = response;
        if (!StorageService.getAll().length) {
          StorageService.add(ctrl.data);
        }
      }, function(reason) {
        console.error('Error CallcenterService:', reason);
      });
  } else {
    ctrl.data = StorageService.getAll();
  }

};

angular
  .module('components.callcenter')
  .controller('CallcenterTableController', CallcenterTableController);
