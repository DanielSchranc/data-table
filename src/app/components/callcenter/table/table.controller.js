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
      StorageService.add(ctrl.filteredCities);
    }
  }

  function storeDataFromLocalStorage(response) {
    if (!response) {
      console.log('No data stored in localStorage');
      return;
    }
    ctrl.filteredCities = response;
  }

  function getCallcenterData() {
    CallcenterService
      .getData()
      .then(storeCallcenterData);
  }

  function getDataFromLocalStorage() {
    StorageService
      .getAllAsync()
      .then(storeDataFromLocalStorage);
  }

  function getCallcenterDataFromStorage() {
    if (navigator.onLine) {
      getCallcenterData();
    } else {
      getDataFromLocalStorage();
    }
  }

  getCallcenterDataFromStorage();

  ctrl.updateResults = function(event) {
    ctrl.filteredCities = ctrl.tableSearchFilter(ctrl.CallsData, event.city);
    ctrl.showNoResultsMsg = CallcenterService.showMsg(ctrl.filteredCities);
  }
}

angular
  .module('components.callcenter')
  .controller('CallcenterTableController', CallcenterTableController);
