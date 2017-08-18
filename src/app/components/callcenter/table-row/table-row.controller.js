function CallcenterTableRowController() {
  var ctrl = this;
  ctrl.getTotal = function(array, key) {
  	var total = 0;
  	array.forEach(function(item) {
  		total += parseInt(item[key]);
  	});
  	return total;
  }
};

angular
  .module('components.callcenter')
  .controller('CallcenterTableRowController', CallcenterTableRowController);
