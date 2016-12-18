/***************************************************
Description: Site configs
****************************************************/
var settingJs = (function(){
	'use strict';

	var currentDate = new Date(),
	endDate = new Date(2017,0,1,23,59,59),
	host = window.location.host,
	configs = {};

	switch(host){
		case 'live':
		configs.appPrefix = 'bzSkeLive';
		configs.baseUrl = 'http://live.com/';
		configs.baseUrlDb = 'http://live.com/';
		configs.googleAnalyticIds = [''];
		configs.googleApiKey = '';
		configs.googleApiClientId = '';
		configs.facebookAppId = '';
		break;
		default:
		configs.appPrefix = 'bzSkeLocal';
		configs.baseUrl = 'http://localhost:9999/';
		configs.baseUrlDb = 'http://localhost:5555/';
		configs.googleAnalyticIds = [''];
		configs.googleApiKey = 'AIzaSyCSuVSxj5XPG_DHxp5CnPfxOs4txoC9Oh8';
		configs.googleApiClientId = '437113297903-qliicro81m3d987ka8lpa8vd5k6ab1mg.apps.googleusercontent.com';
		configs.facebookAppId = '870470899727751';
		break;
	}

	return {
		appPrefix: configs.appPrefix,
		baseUrl: configs.baseUrl,
		baseUrlDb: configs.baseUrlDb,
		hostSubFolder: '/',
		apiVersion: '',
		language: 'vi',
		loadingVisible: true,
		loadingOnce: true,
		routers: [],
		reloadPageOnStateChange: false,
		storageExpireTime: undefined,
		enabledHtml5Mode: true,
		animationDelay: 0,
		pageTransitionSequence: [
		{stateName:'home', transition:'0,0'},
		{stateName:'about', transition:'0,0'},
		{stateName:'contact', transition:'0,0'}
		],
		pageTransitionLoop: true,
		pageTransitionDelay: 1500,
		pageVisibleCount: 5,
		preloadResource: [
		],
		stopCampaign: currentDate > endDate,
		facebook: {
			appId: configs.facebookAppId,
			version: 'v2.5',
			permissions: 'email',
			cookie: true,
			xfbml: true,
			language: 'vi_VN',
			redirect: configs.baseUrl
		},
		google: {
			api:{
				apiKey: configs.googleApiKey,
				clientId: configs.googleApiClientId,
				scope: [
				'https://www.googleapis.com/auth/plus.login'
				]
			},
			ga: {
				ids: configs.googleAnalyticIds
			}
		},
		admin: {
			itemPerPage: '20',
			routers: []
		},
		roles: {
			ALL: '*',
			ADMIN: 'admin',
			EDITOR: 'editor',
			REGISTER: 'register',
			GUEST: 'guest'
		}
	}
})();