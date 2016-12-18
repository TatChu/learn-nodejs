(function() {
    var app = angular.module('bzApp');

    app.factory('peopleService', peopleService);
    app.factory('peopleSearchervice', peopleSearchervice);
    function peopleService($resource) {

        return $resource('http://localhost:6868/api/people/:id', { id: "@_id" }, {
            'get': { method: 'GET', isArray: false },
            'save': { method: 'POST' },
            'query': { method: 'GET', isArray: true },
            'remove': { method: 'DELETE' },
            'delete': { method: 'DELETE', isArray: true },
            'update': { method: 'PUT', isArray: false }
        });
        // return {
        // 	getAll : getAll,
        // 	getByID: get,
        // 	create: post,
        // 	delete: del
        // }
        // function getAll() {
        //  	return $resource('http://TheBossPC:3003/api/people');
        //  }

        //  function get(id) {
        //  	return $resource('http://TheBossPC:3003/api/people/:id', {id: "@id"}, {get: {method: 'GET'}});
        //  }

        //  function post(people){
        //  	return $resource('http://TheBossPC:3003/api/people', people, {save:  {method:'POST'} });
        //  }
        //  function del(id) {
        // 	 return  $resource('http://TheBossPC:3003/api/people:id', {id: "@id"}, {delete:  {method:'DELETE', isArray: true} });
        //  }
    }




    function peopleSearchervice($resource) {

        return $resource('http://localhost:6868/api/people/getByDivisionID/:id', { id: "@_id" }, {
            'get': { method: 'GET', isArray: true}
        });
    }
})();