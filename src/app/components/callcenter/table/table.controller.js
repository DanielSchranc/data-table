function CallcenterTableController(CallcenterAPIService, StorageService, CallcenterService) {
  var ctrl = this;
  ctrl.CallsData = [];
  CallcenterService
    .getData()
    .then(function(response) {
      console.log('ctrl', response);
    });
  function storeCallcenterData(response) {
    ctrl.CallsData = response;
    if (!StorageService.getAll().length) {
      StorageService.add(ctrl.CallsData);
    }
  }

  function getCallcenterData() {
    CallcenterAPIService
      .getEmergencyCalls()
      .then(storeCallcenterData);
  }

  function getCallcenterDataFromStorage() {
    if (navigator.onLine) {
      getCallcenterData();
    } else {
      ctrl.CallsData = StorageService.getAll();
    }
  }

  getCallcenterDataFromStorage();

};

angular
  .module('components.callcenter')
  .controller('CallcenterTableController', CallcenterTableController);
