function MapDataService(CallcenterService) {
  // ctrl.calls = [{
  //   city: 'Bratislava',
  //   month: {
  //     january: {
  //       identified: 8913,
  //       notIdentified: 2246,
  //       all: 11159,
  //       answered: 10042,
  //       justified: 6363 s
  //     },
  //     february: {
  //       //...
  //     }
  //   }
  // }];
  var itemModel = {
    city: '',
    months: []
  }
  var identifiers = ['Banská Bystrica', 'Bratislava', 'Koice', 'Nitra', 'Preov', 'Trenčín', 'Trnava', 'ilina'];

  CallcenterService
    .getEmergencyCalls()
    .then(function(response) {
      var rawData = response;
      rawData.forEach(function(item) {
        var filtered = [];
        return filtered = rawData.filter(function(value) {
          return value.Callcentername === item.Callcentername;
        });
        console.log(filtered);
      });
    });

  return {}
}

angular
  .module('components.callcenter')
  .factory('MapDataService', MapDataService);
