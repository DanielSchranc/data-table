function StorageService($q, $localStorage) {
  $localStorage = $localStorage.$default({
    items: []
  });

  function add(item) {
    $localStorage.items = item;
  }

  function getAll() {
    return $localStorage.items;
  }

  function getAllAsync() {
    return $q(function(resolve, reject) {
      if ($localStorage.items.length) {
        resolve($localStorage.items);
      } else {
        reject($localStorage.items);
      }
    });
  }

  function remove(item) {
    $localStorage.items.splice($localStorage.items.indexOf(item), 1);
  }

  function removeAll() {
    $localStorage.$reset();
  }

  // Public API
  return {
    add: add,
    getAll: getAll,
    getAllAsync: getAllAsync,
    remove: remove,
    removeAll: removeAll
  }
}
angular
  .module('common')
  .factory('StorageService', StorageService);
