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
  
};

angular
  .module('components.callcenter')
  .controller('CallcenterTableSearchController', CallcenterTableSearchController);
