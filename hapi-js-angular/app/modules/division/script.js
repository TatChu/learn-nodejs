(function() {
    var mod_division = $("#mod-division");

    var app = angular.module('bzApp');
    app.controller('divisionCtrl', divisionCtrl);

    function divisionCtrl($scope, divisionService, confirmService, peopleSearchervice) {
        $scope.lsDivision = [];
        

        function getAll() {
            divisionService.query(function(res) {
	                $scope.lsDivision = res;
 					console.log($scope.lsDivision);
 					// for (var i = 0; i <= $scope.lsDivision.length - 1; i++) {
			   //          	// console.log(i);
			   //              peopleSearchervice.get({ id: $scope.lsDivision[i].id }, function(res) {
						// 		// $scope.lsDivision[i].people = res;
						// 		console.log(i, ":",res);
			   //              }, function (err){
			   //              	console.log(err);
			   //              })
			   //          }
	            });

   //          /////////////////// $scope.lsDivision.length empty
			// // console.log($scope.lsDivision.length);
   //          for (var i = 0; i <= $scope.lsDivision.length - 1; i++) {
	  //               peopleSearchervice.query({ id: $scope.lsDivision[i].id }, function(res) {
	  //               	console.log($scope.lsDivision[i].people);
			// 			$scope.lsDivision[i].people = res;
			// 			console.log($scope.lsDivision[i].people);
	  //               })
	  //           }
        }

        getAll();
        $scope.delete = Delete;
       
        function Delete(division) {
            // var temp = peopleService.get({ id: person.id });
            if (confirmService.confirm("Are you sure want to delete division: " + division.name + "?")) {
                console.log("Deleting ID: " + division.id);
                divisionService.delete({ id: division.id });
                getAll();
            }

        }


    }


})();