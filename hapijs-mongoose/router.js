// Load modules

var People      = require('./controller/people'),
	Division      = require('./controller/division'),
  Login      = require('./controller/login');

// Setup routing
exports.routing = [

  { method: 'GET',  path: '/people', config: People.home },
  { method: 'GET', path: '/people/new', config: People.getNew},
  { method: 'POST', path: '/people/new', config: People.new},
  { method: 'GET', path: '/people/edit/{_id}', config: People.getUpdate},
  { method: 'POST', path: '/people/update/{_id}', config: People.update},
  { method: 'GET', path: '/people/delete/{_id}', config: People.delete},
  { method: 'GET', path: '/people/search/{keyword*}', config: People.search},

  { method: 'GET',  path: '/division', config: Division.home },
  { method: 'GET', path: '/division/new', config: Division.getNew},
  { method: 'POST', path: '/division/new', config: Division.new},
  { method: 'GET', path: '/division/edit/{_id}', config: Division.getUpdate},
  { method: 'POST', path: '/division/update/{_id}', config: Division.update},
  { method: 'GET', path: '/division/delete/{_id}', config: Division.delete},
  { method: 'GET', path: '/division/search/{keyword*}', config: Division.search},

  { method: 'GET',  path: '/login', config: Login.get_login },
  { method: 'GET', path: '/register', config: Login.get_register},
  { method: 'POST', path: '/register', config: Login.register},
  { method: 'POST', path: '/login', config: Login.login}
];