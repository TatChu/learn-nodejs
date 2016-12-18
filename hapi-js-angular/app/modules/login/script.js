(function(){

	var app = angular.module('bzApp');
	app.controller('LoginCtrl', LoginCtrl);

	function LoginCtrl($scope, $rootScope, $resource, $cookieStore){
		$scope.email = '';
		$scope.login = function(){
			$resource('http://localhost:6868/api/login', null, {'get': {method: 'POST'}}).get({email:$scope.email}, function (res){
				$rootScope.login(res);
			}, function (err){
				console.log(err);
			})
		}
	}
})();