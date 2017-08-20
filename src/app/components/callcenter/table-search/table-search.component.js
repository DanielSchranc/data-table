var callcenterTableSearch = {
  bindings: {
    onUpdateResults: '&'
  },
  templateUrl: './table-search.html',
  controller: 'CallcenterTableSearchController'
};

angular
  .module('components.callcenter')
  .component('callcenterTableSearch', callcenterTableSearch);