function CallcenterTableRowController($filter) {
  var ctrl = this;

  ctrl.$onInit = function() {
    ctrl.cities = ctrl.cities;
    ctrl.totalCallsFilter = $filter('totalCallsFilter');
  }

  ctrl.getTotal = function(key) {
    return ctrl.totalCallsFilter(ctrl.cities, key);
  }

  ctrl.deleteItem = function(index) {
    ctrl.cities.splice(index, 1);
  }
}

angular
  .module('components.callcenter')
  .controller('CallcenterTableRowController', CallcenterTableRowController);
