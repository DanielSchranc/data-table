function StorageService($localStorage) {
  $localStorage = $localStorage.$default({
    items: []
  });

  function add(item) {
    $localStorage.items = item;
  }

  function getAll() {
    return $localStorage.items;
  };

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
    remove: remove,
    removeAll: removeAll
  };
}
angular
  .module('components.callcenter')
  .factory('StorageService', StorageService);
