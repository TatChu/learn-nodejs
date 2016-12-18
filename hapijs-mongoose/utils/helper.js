var Handlebars = require('handlebars');

module.exports = function(){

	Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {

	    if (arguments.length < 3)
	        throw new Error("Handlerbars Helper 'compare' needs 2 parameters!!! :x");

	    var operator = options.hash.operator || "==";

	    var operators = {
	        '==': function(l, r) { return l == r; },
	        '===': function(l, r) {
	            console.log(l, ' === ? ', r);
	            return l === r;
	        },
	        '!=': function(l, r) { return l != r; },
	        '<': function(l, r) { return l < r; },
	        '>': function(l, r) { return l > r; },
	        '<=': function(l, r) { return l <= r; },
	        '>=': function(l, r) { return l >= r; },
	        'typeof': function(l, r) { return typeof l == r; }
	    }

	    if (!operators[operator])
	        throw new Error("Handlerbars Helper 'compare' chưa biết so sánh biểu thức: " + operator);

	    var result = operators[operator](lvalue, rvalue);

	    if (result) {
	        return options.fn(this);
	    } else {
	        return options.inverse(this);
	    }

	});
}