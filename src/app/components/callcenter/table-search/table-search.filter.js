function tableSearchFilter() {
  return function(collection, param) {
    if (!param) return collection;

    var newArray = [];
    collection.forEach(function(array) {
      var filter = [];
      filter = array.filter(function(item) {
        return item.Callcentername.toLowerCase().indexOf(param.toLowerCase()) !== -1;
      });
      newArray.push(filter);
    });
    return newArray;
  }
}
angular
  .module('components.callcenter')
  .filter('tableSearchFilter', tableSearchFilter);
