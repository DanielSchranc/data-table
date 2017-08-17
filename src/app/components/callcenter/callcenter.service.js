function CallcenterService(CallcenterAPIService) {
  // ctrl.calls = [{
  //   city: 'Bratislava',
  //   months: {
  //     total: {
  //       identified: 86913,
  //       notIdentified: 22846,
  //       all: 11159,
  //       answered: 140042,
  //       justified: 68363
  //     },
  //     january: {
  //       identified: 8913,
  //       notIdentified: 2246,
  //       all: 11159,
  //       answered: 10042,
  //       justified: 6363
  //     },
  //     february: {
  //       //...
  //     }
  //   }
  // },
  // {
  //   city: Banska Bystrica,
  //   months: {
  //     total: {
  //       identified: 86913,
  //       notIdentified: 22846,
  //       all: 11159,
  //       answered: 140042,
  //       justified: 68363
  //     },
  //     january: {
  //       identified: 8913,
  //       notIdentified: 2246,
  //       all: 11159,
  //       answered: 10042,
  //       justified: 6363
  //     },
  //     february: {
  //       //...
  //     }
  //   }
  // }];
  var records = [];
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
        // returns new array of arrays for each city
        return getFilteredArray(response, identifiers);
      })
      .then(function(response) {
        // array mapping to the object used in UI
        response.forEach(function(record) {
          record.forEach(function(callcenter) {
            Object.assign(itemModel, callcenter);
            console.log('hello', itemModel);
          });
        });
        console.log('hello', response);
      });
  }

  return {
    getData: getTransformedData
  }
}

angular
  .module('components.callcenter')
  .factory('CallcenterService', CallcenterService);
