var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var People = require('../model/people.js');
var divisionSchema = new Schema({
	name: { type: String, required: true},
	note: String,
	quantity: Number,
  people: [],
	created_at: Date,
	updated_at: Date
});


divisionSchema.pre('save', function(next) {
  // get the current date
  this.quantity = 0;
  this.people = [];
  var currentDate = new Date();
  
  this.updated_at = currentDate;
  
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});
divisionSchema.methods.getPeople = function(callback){
  People.find({division: this._id}, function(err, p){
    if (err) throw err;
    this.people = p;
    callback();
  });
}
divisionSchema.methods.GiamSL = function(){
  // this.quantity = this.quantity - 1;
  this.update({quantity : this.quantity - 1}).exec(function(err, division){
      console.log('-------------------------------------------------');
      // console.log(division);
  });

}
divisionSchema.methods.TangSL = function(){
   this.update({quantity : this.quantity + 1}).exec(function(err, division){
      console.log('-------------------------------------------------');
      // console.log(division);
  });
}

var Division = mongoose.model('Division', divisionSchema);

module.exports = Division;
