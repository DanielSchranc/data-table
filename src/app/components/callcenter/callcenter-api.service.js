function CallcenterAPIService($http, StorageService, CONFIG) {
  var api = CONFIG.API.CALLS;
  var data = CONFIG.PRELOAD_RESOURCE;
  var records = [];

  this.getEmergencyCalls = function() {
    return $http
      .post(api, data)
      .then(function(response) {
        records = response.data.result.records;
        return records;
      }, function(reason) {
        console.error('Error: CallcenterAPIService: ', reason);
      });
  }

}

angular
  .module('components.callcenter')
  .service('CallcenterAPIService', CallcenterAPIService);
