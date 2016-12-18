(function(){
	var app = angular.module('bzApp');
	app.controller('DetailDivisionCtrl', DetailDivisionCtrl);
	function DetailDivisionCtrl ($scope, $stateParams, $state, divisionService, confirmService){
		//Get params from Ui-router
		$scope.state  = $stateParams.id;
		if($scope.state == "")
			$scope.edit = 0;
		else
			$scope.edit = 1;

		///get division by id
		$scope.division = {};
		if($scope.edit){
			divisionService.get({id: $scope.edit}, function (res){
				$scope.division = res;
			})
		}



		$scope.Update = Update;
		$scope.addNewDivision = addNewDivision;

		function addNewDivision(){
			console.log("Adding...");
			divisionService.save($scope.division, function(res){
				console.log('ADD SUCCESSFULLY: ', res);
				$state.go('division');
			}, function (err){
				console.log('ADD ERROR: ', err);
			})
			

		}
		function Update(){
			console.log("Updating...");
			divisionService.update($scope.division);
			$state.go('division');
		}
	}
})();