function CallcenterTableController(StorageService, CallcenterService, $filter) {
  var ctrl = this;
  ctrl.CallsData = [];
  ctrl.showNoResultsMsg = false;
  ctrl.isOnline = checkAppOnline();
  
  ctrl.$onInit = function() {
    ctrl.tableSearchFilter = $filter('tableSearchFilter');
  }

  function checkAppOnline() {
    return navigator.onLine;
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
    if (ctrl.isOnline) {
      getCallcenterData();
    } else {
      getDataFromLocalStorage();
    }
  }

  getCallcenterDataFromStorage();
  console.log('table', ctrl.isOnline)
  ctrl.updateResults = function(event) {
    var array = ctrl.isOnline ? ctrl.CallsData : ctrl.filteredCities;
    ctrl.filteredCities = ctrl.tableSearchFilter(array, event.city);
    ctrl.showNoResultsMsg = CallcenterService.showMsg(ctrl.filteredCities);
  }
}

angular
  .module('components.callcenter')
  .controller('CallcenterTableController', CallcenterTableController);
