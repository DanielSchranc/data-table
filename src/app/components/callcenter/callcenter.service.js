function CallcenterService(CallcenterAPIService) {
  // ctrl.calls = [{
  //   city: 'Bratislava',
  //   months: {
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

  var identifiers = [
    { id: 'Banská Bystrica' },
    { id: 'Bratislava' },
    { id: 'Koice' },
    { id: 'Nitra' },
    { id: 'Preov' },
    { id: 'Trenčín' },
    { id: 'Trnava' },
    { id: "ilina" }
  ];

  function getFilteredArray(array, idArray) {
    var newArray = [];
    idArray.forEach(function(item) {
      var filtered = [];
      filtered = array.filter(function(value) {
        return value.Callcentername === item.id;
      });
      newArray.push(filtered);
    });
    return newArray;
  }

  var getTransformedData = function() {
    return CallcenterAPIService
      .getEmergencyCalls()
      .then(function(response) {
        return getFilteredArray(response, identifiers);
      });
  }

  return {
    getData: getTransformedData
  }
}

angular
  .module('components.callcenter')
  .factory('CallcenterService', CallcenterService);
