// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var stratSchema = new Schema({
  id: String,
  map: String
});

// the schema is useless so far
// we need to create a model using it
var Strat = mongoose.model('Strat', stratSchema);

// make this available to our users in our Node applications
module.exports = Strat;
