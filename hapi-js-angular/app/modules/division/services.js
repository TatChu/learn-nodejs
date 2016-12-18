(function(){
	var app = angular.module('bzApp');

	app.factory('divisionService', divisionService);
	function divisionService($resource) {
		return $resource('http://localhost:6868/api/division/:id', {id: "@_id"} , { 
                'get':    {method:'GET'},
                'save':   {method:'POST',  isArray:false},
                'query':  {method:'GET', isArray:true},
                'remove': {method:'DELETE'},
                'delete': {method:'DELETE',  isArray:true},
                'update': {method:'PUT',  isArray:false}
            });
	}
})();
/////////////////////////
///return $resource('http://localhost:6868/api/division/:id', {id: "@_id"} , {  What is {id: "@_id"}