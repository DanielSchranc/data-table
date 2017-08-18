function CallcenterTableSearchController() {
  var ctrl = this;
  ctrl.searchFilter = '';
};

angular
  .module('components.callcenter')
  .controller('CallcenterTableSearchController', CallcenterTableSearchController);