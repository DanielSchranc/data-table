(function(angular){
'use strict';
angular
  .module('root', [
    'common',
    'components',
    'templates'
  ]);}(window.angular));
(function(angular){
'use strict';
angular
  .module('common', []);}(window.angular));
(function(angular){
'use strict';
angular
  .module('components', [
    'components.callcenter'
  ]);}(window.angular));
(function(angular){
'use strict';
angular
  .module('components.callcenter', [
    'ngStorage'
  ])
  .constant('CONFIG', {
    API: {
      CALLS: 'https://data.gov.sk/api/3/action/datastore_search'
    },
    PRELOAD_RESOURCE: {
      "resource_group_id": "069a1c5e-7243-4e69-844d-f7cfc41e277e",
      "data_correctness": "correct and exact",
      "maintainer": "2DF13D50-0B6F-48BA-884E-BE66DC0A2934",
      "periodicity": "annually",
      "cache_last_updated": null,
      "webstore_last_updated": null,
      "datastore_active": true,
      "id": "c2098147-16f3-41fc-acee-638a31bf3bbf",
      "size": null,
      "valid_from": "",
      "validity_description": "",
      "state": "active",
      "transformed": false,
      "last_modified": null,
      "on_same_domain": true,
      "schema": "",
      "status": "public",
      "periodicity_description": "",
      "hash": "",
      "description": "",
      "format": "CSV",
      "validity": "perm_valid",
      "tracking_summary": { "total": 1, "recent": 1 },
      "mimetype_inner": null,
      "url_type": "upload",
      "active_to": "",
      "data_correctness_description": "",
      "active_from": "",
      "mimetype": null,
      "cache_url": null,
      "name": "Pocty volan\u00ed 112 za rok 2016",
      "created": "2017-03-31T13:07:48.717885",
      "url": "https://data.gov.sk/dataset/ec254f6d-ba3b-4abc-9ae5-6e6bc3b68e00/resource/c2098147-16f3-41fc-acee-638a31bf3bbf/download/poctyvolaniltv112zarok2016.csv",
      "valid_to": "",
      "webstore_url": null,
      "position": 0,
      "revision_id": "06cb0d82-bc67-4b01-b74b-fc36ee053d12",
      "resource_type": null
    }
  });
}(window.angular));
(function(angular){
'use strict';
var root = {
  templateUrl: './root.html'
};

angular
  .module('root')
  .component('root', root);}(window.angular));
(function(angular){
'use strict';
StorageService.$inject = ["$localStorage"];
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
  .module('common')
  .factory('StorageService', StorageService);
}(window.angular));
(function(angular){
'use strict';
CallcenterAPIService.$inject = ["$http", "StorageService", "CONFIG"];
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
}(window.angular));
(function(angular){
'use strict';
CallcenterService.$inject = ["CallcenterAPIService"];
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
}(window.angular));
(function(angular){
'use strict';
var callcenterTable = {
  templateUrl: './table.html',
  controller: 'CallcenterTableController'
};

angular
  .module('components.callcenter')
  .component('callcenterTable', callcenterTable);}(window.angular));
(function(angular){
'use strict';
CallcenterTableController.$inject = ["StorageService", "CallcenterService"];
function CallcenterTableController(StorageService, CallcenterService) {
  var ctrl = this;
  ctrl.CallsData = [];

  function storeCallcenterData(response) {
    ctrl.CallsData = response;
    if (!StorageService.getAll().length) {
      StorageService.add(ctrl.CallsData);
    }
  }

  function getCallcenterData() {
    CallcenterService
    .getData()
    .then(storeCallcenterData);
  }

  function getCallcenterDataFromStorage() {
    if (navigator.onLine) {
      getCallcenterData();
    } else {
      ctrl.CallsData = StorageService.getAll();
    }
  }

  getCallcenterDataFromStorage();

};

angular
  .module('components.callcenter')
  .controller('CallcenterTableController', CallcenterTableController);
}(window.angular));
(function(angular){
'use strict';
var callcenterTableRow = {
  bindings: {
    cities: '<'
  },
  templateUrl: './table-row.html',
  controller: 'CallcenterTableRowController'
};

angular
  .module('components.callcenter')
  .component('callcenterTableRow', callcenterTableRow);}(window.angular));
(function(angular){
'use strict';
function CallcenterTableRowController() {
  var ctrl = this;

};

angular
  .module('components.callcenter')
  .controller('CallcenterTableRowController', CallcenterTableRowController);
}(window.angular));
(function(angular){
'use strict';
angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('./root.html','<div class="root"><callcenter-table></callcenter-table></div>');
$templateCache.put('./table.html','<div class="calls-table"><ul class="calls-table__list"><li ng-repeat="cities in $ctrl.CallsData"><callcenter-table-row cities="cities"></callcenter-table-row></li></ul></div>');
$templateCache.put('./table-row.html','<ul ng-repeat="item in $ctrl.cities" class="calls-table__list--data"><li>City: <span>{{item.Callcentername}}</span></li><li>Month: <span>{{item.mesiac}}</span></li><li>identified: <span>{{item.Identifikovane}}</span></li><li>notIdentified: <span>{{item.Neidentifikovane}}</span></li><li>all: <span>{{item.Vsetky}}</span></li><li>answered: <span>{{item.Zdvihnute}}</span></li><li>justified: <span>{{item.Opravnene}}</span></li></ul>');}]);}(window.angular));
//# sourceMappingURL=bundle.js.map
