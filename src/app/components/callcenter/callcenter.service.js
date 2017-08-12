function CallcenterService($http, CONFIG) {
  var api = CONFIG.API.CALLS;
  var data = CONFIG.PRELOAD_RESOURCE;

  this.getEmergencyCalls = function() {
    return $http
      .post(api, data)
      .then(function(response) {
        return response.data.result.records;
      }, function(reason) {
        console.error('Error: CallcenterService: ', reason);
      });
  }
}

angular
  .module('components.callcenter')
  .service('CallcenterService', CallcenterService);
