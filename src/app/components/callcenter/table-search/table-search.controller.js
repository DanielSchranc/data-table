function CallcenterTableSearchController() {
  var ctrl = this;

  ctrl.$onInit = function() {
    ctrl.city = '';
  }

  ctrl.updateCityResults = function(city) {
    ctrl.onUpdateResults({
      $event: {
        city: city
      }
    });
  }

};

angular
  .module('components.callcenter')
  .controller('CallcenterTableSearchController', CallcenterTableSearchController);
