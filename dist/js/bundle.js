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

  var checkEachItemLength = function(array) {
    return array.every(function(element) {
      return !element.length;
    });
  }

  return {
    getData: getTransformedData,
    showMsg: checkEachItemLength
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
CallcenterTableController.$inject = ["StorageService", "CallcenterService", "$filter"];
function CallcenterTableController(StorageService, CallcenterService, $filter) {
  var ctrl = this;
  ctrl.CallsData = [];
  ctrl.showNoResultsMsg = false;

  ctrl.$onInit = function() {
    ctrl.tableSearchFilter = $filter('tableSearchFilter');
  }

  function storeCallcenterData(response) {
    ctrl.CallsData = response;
    ctrl.filteredCities = ctrl.CallsData;
    if (!StorageService.getAll().length) {
      StorageService.add(ctrl.filteredCities);
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
      ctrl.filteredCities = StorageService.getAll();
    }
  }

  getCallcenterDataFromStorage();

  ctrl.updateResults = function(event) {
    ctrl.filteredCities = ctrl.tableSearchFilter(ctrl.CallsData, event.city);
    ctrl.showNoResultsMsg = CallcenterService.showMsg(ctrl.filteredCities);
  }

};

angular
  .module('components.callcenter')
  .controller('CallcenterTableController', CallcenterTableController);
}(window.angular));
(function(angular){
'use strict';
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
  .filter('totalCallsFilter', totalCallsFilter);}(window.angular));
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
CallcenterTableRowController.$inject = ["$filter"];
function CallcenterTableRowController($filter) {
  var ctrl = this;

  ctrl.$onInit = function() {
    ctrl.cities = ctrl.cities;
    ctrl.totalCallsFilter = $filter('totalCallsFilter');
  }

  ctrl.getTotal = function(key) {
    return ctrl.totalCallsFilter(ctrl.cities, key);
  }

  ctrl.deleteItem = function(index) {
    ctrl.cities.splice(index, 1);
  }
}

angular
  .module('components.callcenter')
  .controller('CallcenterTableRowController', CallcenterTableRowController);
}(window.angular));
(function(angular){
'use strict';
var callcenterTableSearch = {
  bindings: {
    onUpdateResults: '&'
  },
  templateUrl: './table-search.html',
  controller: 'CallcenterTableSearchController'
};

angular
  .module('components.callcenter')
  .component('callcenterTableSearch', callcenterTableSearch);}(window.angular));
(function(angular){
'use strict';
function CallcenterTableSearchController() {
  var ctrl = this;

  ctrl.$onInit = function() {
    ctrl.city = '';
  }

  ctrl.updateCityResults = function(city) {
    ctrl.onUpdateResults({
      $event: {
        city: city
      }
    });
  }

};

angular
  .module('components.callcenter')
  .controller('CallcenterTableSearchController', CallcenterTableSearchController);
}(window.angular));
(function(angular){
'use strict';
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
}(window.angular));
(function(angular){
'use strict';
angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('./root.html','<div class="root"><header><h1>Emergency calls statistics per year 2016</h1></header><callcenter-table></callcenter-table></div>');
$templateCache.put('./table.html','<div class="calls-table"><callcenter-table-search on-update-results="$ctrl.updateResults($event)"></callcenter-table-search><ul class="calls-table__list"><li ng-repeat="cities in $ctrl.filteredCities track by $index"><callcenter-table-row cities="cities"></callcenter-table-row></li><li ng-show="!$ctrl.filteredCities.length"><p class="loading pad--l pad--b">Loading data \uD83D\uDE80...</p></li><li ng-show="$ctrl.showNoResultsMsg"><p class="no__results pad--l pad--b">Sorry no results \uD83D\uDE2D for such query. Pls, search for cities \uD83C\uDFE4 only \uD83D\uDE0A\uD83D\uDC4C.</p></li></ul></div>');
$templateCache.put('./table-row.html','<div class="calls-table__row" ng-class="{ \'pad--0\': !$ctrl.cities.length }"><ul class="calls-table__list--data pad--b" ng-hide="!$ctrl.cities.length"><li style="margin-right: 16px; width: auto"></li><li>City:</li><li>Month:</li><li>Identified:</li><li>Not Identified:</li><li>All:</li><li>Answered:</li><li>Justified:</li></ul><ul ng-repeat="item in $ctrl.cities" class="calls-table__list--data"><li class="calls-table__delete" ng-click="$ctrl.deleteItem($index);">x</li><li><span>{{item.Callcentername}}</span></li><li><span>{{item.mesiac}}</span></li><li><span>{{item.Identifikovane}}</span></li><li><span>{{item.Neidentifikovane}}</span></li><li><span>{{item.Vsetky}}</span></li><li><span>{{item.Zdvihnute}}</span></li><li><span>{{item.Opravnene}}</span></li></ul><ul class="calls-table__list--total" ng-hide="!$ctrl.cities.length"><li style="margin-right: 16px; width: auto"></li><li>Total per year:</li><li>&nbsp;</li><li>{{$ctrl.getTotal(\'Identifikovane\')}}</li><li>{{$ctrl.getTotal(\'Neidentifikovane\')}}</li><li>{{$ctrl.getTotal(\'Vsetky\')}}</li><li>{{$ctrl.getTotal(\'Zdvihnute\')}}</li><li>{{$ctrl.getTotal(\'Opravnene\')}}</li></ul></div>');
$templateCache.put('./table-search.html','<div class="calls-table__search"><label>Type and search <input type="text" placeholder="Search city" ng-model="$ctrl.city" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-change="$ctrl.updateCityResults($ctrl.city)"></label></div>');}]);}(window.angular));
//# sourceMappingURL=bundle.js.map
