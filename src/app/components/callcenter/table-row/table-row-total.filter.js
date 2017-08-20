function totalCallsFilter() {
  return function(collection, param) {
    var total = 0;
    collection.forEach(function(item) {
      total += parseInt(item[param]);
    });
    return total;
  }
}

angular
  .module('components.callcenter')
  .filter('totalCallsFilter', totalCallsFilter);