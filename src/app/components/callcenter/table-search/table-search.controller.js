function CallcenterTableSearchController($filter) {
  var ctrl = this;

  ctrl.$onInit = function() {
    ctrl.city = '';
  }

  ctrl.updateCityResults = function(event) {
    ctrl.onUpdateResults({
      $event: {
        city: event
      }
    });
  }

  // ctrl.$onChanges = function(changes) {
  //   console.log(changes);
  // }

  // ctrl.updateResults = function(city) {
  //   ctrl.tableSearchFilter(city);
  //   console.log(model);
  // }
};

angular
  .module('components.callcenter')
  .controller('CallcenterTableSearchController', CallcenterTableSearchController);
