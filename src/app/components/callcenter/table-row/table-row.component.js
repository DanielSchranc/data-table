var callcenterTableRow = {
  bindings: {
    cities: '<'
  },
  templateUrl: './table-row.html',
  controller: 'CallcenterTableRowController'
};

angular
  .module('components.callcenter')
  .component('callcenterTableRow', callcenterTableRow);