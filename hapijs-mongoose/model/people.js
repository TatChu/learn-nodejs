var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Division = require('../model/division.js');
var peopleSchema = new Schema({
  name: { type: String, required: true},
  email: String,
  phone: String,
  username: String,
  password: String,
  division: {type: Schema.Types.ObjectId, ref: 'Division'},
  created_at: Date,
  updated_at: Date
});

peopleSchema.pre('save', function(next) {
  //set format for name feild
  this.name = this.name.replace(/\b\w/g, l => l.toUpperCase());
  next();
});


// peopleSchema.pre('findOneAndRemove', function(next) {
//   Division.findOne({_id: this.division}, function(err, division){
//     if(err) throw err;
//     // console.log("===============================================================");
//     // console.log(division);
//     // console.log("===============================================================");
//     console.log('--Dang update giam so luong trong division - ',(division));
//     Division.findOneAndUpdate({_id: division._id}, {quantity: division.quantity - 1} , function(err){ 
//       if(err) throw err;
//       console.log('----Cap nhat so luong giam trong division thanh cong!');
//     })
//   })
  
//   // get the current date
//   var currentDate = new Date();
  
//   this.updated_at = currentDate;
//   if (!this.created_at)
//     this.created_at = currentDate;

//   next();
// });



peopleSchema.methods.setFormat = function() {
  this.name = this.name.replace(/\b\w/g, l => l.toUpperCase());
  this.username = this.username.toLowerCase();
};

var People = mongoose.model('People', peopleSchema);

module.exports = People;