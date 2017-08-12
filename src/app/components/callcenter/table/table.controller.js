function CallcenterTableController(CallcenterService) {
  var ctrl = this;

  ctrl.data = null;

  CallcenterService.getEmergencyCalls()
    .then(function(response) {
      ctrl.data = response;
      console.log('hello', response);
    }, function(reason) {
      console.log('reason', reason);
    });

};

angular
  .module('components.callcenter')
  .controller('CallcenterTableController', CallcenterTableController);