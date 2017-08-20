function CallcenterService(CallcenterAPIService) {

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
          // Returns new array of arrays for each city
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
