function CallcenterTableController(StorageService, CallcenterService, $filter) {
  var ctrl = this;
  ctrl.CallsData = [];

  ctrl.$onInit = function() {
    ctrl.tableSearchFilter = $filter('tableSearchFilter');
  }

  function storeCallcenterData(response) {
    ctrl.CallsData = response;
    ctrl.filteredCities = ctrl.CallsData;
    console.log(ctrl.filteredCities);
    if (!StorageService.getAll().length) {
      StorageService.add(ctrl.CallsData);
    }
  }

  function getCallcenterData() {
    CallcenterService
      .getData()
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

  ctrl.updateResults = function(event) {
    ctrl.filteredCities = ctrl.tableSearchFilter(ctrl.CallsData, event.city);
  }

};

angular
  .module('components.callcenter')
  .controller('CallcenterTableController', CallcenterTableController);
