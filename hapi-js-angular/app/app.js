(function(){
	var app = angular.module('bzApp', ['ui.router', 'ngResource', 'ngCookies']);

	app.controller('BaseCtrl', BaseCtrl);
	function BaseCtrl($scope, $rootScope, $cookieStore)
	{
		var base = this;
		base.loginHrefShow = true;
		$rootScope.title = 'Home';
		base.logout = logout;
		$rootScope.logout = logout;

		$rootScope.login = login;

		function login(user){
			console.log('Login: ', user);
			base.loginHrefShow = false;
			$cookieStore.put('userLogin', $rootScope.user);
			$rootScope.user = user;
			base.user = user;
		}

		function logout(){
			// alert(123456);
			$rootScope.user = null;
			base.user = null;
			$cookieStore.remove('$cookieStore');
		}
		
	}


	app.service('confirmService', ['$window', function ($window) {
		this.confirm = function (msg){
			return $window.confirm(msg);
		}
	}])



	app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

		$httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';

        var homeState = {
            name: 'home',
            url: '/',
            templateUrl: '/modules/home/view.tpl'
        }

        var peoplesState = {
		        name: 'peoples',
		        url: '/peoples',
		        templateUrl: '/modules/peoples/view.tpl'
		    }
		var divisionState = {
		        name: 'division',
		        url: '/division',
		        templateUrl: '/modules/division/view.tpl'
		    }
		var contactState = {
		        name: 'contact',
		        url: '/contact',
		        templateUrl: '/modules/contact/view.tpl'
		    }

		var detailDivisionState = {
		        name: 'detailDivision',
		        url: '/detailDivision/:id',
		        templateUrl: '/modules/detail-division/view.tpl'
		    }

		  var loginState = {
		        name: 'login',
		        url: '/login',
		        templateUrl: '/modules/login/view.tpl'
		    }

		$stateProvider.state(homeState);
        $stateProvider.state(peoplesState);
        $stateProvider.state(divisionState);
        $stateProvider.state(contactState);
        $stateProvider.state(detailDivisionState);
        $stateProvider.state(loginState);


        //Default
        $urlRouterProvider.otherwise('/');
 	})
		
})();