function CallcenterTableController(StorageService, CallcenterService, $filter) {
  var ctrl = this;
  ctrl.CallsData = [];
  ctrl.showNoResultsMsg = false;

  ctrl.$onInit = function() {
    ctrl.tableSearchFilter = $filter('tableSearchFilter');
  }

  function storeCallcenterData(response) {
    ctrl.CallsData = response;
    ctrl.filteredCities = ctrl.CallsData;
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
    ctrl.showNoResultsMsg = CallcenterService.showMsg(ctrl.filteredCities);
  }

};

angular
  .module('components.callcenter')
  .controller('CallcenterTableController', CallcenterTableController);
