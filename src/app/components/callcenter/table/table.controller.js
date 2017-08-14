function CallcenterTableController(CallcenterService, StorageService) {
  var ctrl = this;
  ctrl.data = [];

  function storeCallcenterData(response) {
    ctrl.data = response;
    if (!StorageService.getAll().length) {
      StorageService.add(ctrl.data);
    }
  }

  function getCallcenterData() {
    CallcenterService
      .getEmergencyCalls()
      .then(storeCallcenterData);
  }

  function getCallcenterDataFromStorage() {
    if (navigator.onLine) {
      getCallcenterData();
    } else {
      ctrl.data = StorageService.getAll();
    }
  }

  getCallcenterDataFromStorage();

};

angular
  .module('components.callcenter')
  .controller('CallcenterTableController', CallcenterTableController);
