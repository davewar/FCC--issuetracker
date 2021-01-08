const mongoose = require('mongoose');
require('dotenv').config();


const conn = process.env.MONGO_URI;

const connection = mongoose.createConnection(conn,{
  useNewUrlParser: true,       // surpress warning messages
    useUnifiedTopology: true       // surpress warning messages
})

const UserSchema = new mongoose.Schema({
          issue_title: {type: String, trim:true},
          issue_text: {type: String, trim:true},
          created_on: {type: String, trim:true},
          updated_on: {type: String, trim:true},
          created_by: {type: String, trim:true},
          assigned_to: {type: String, trim:true},
          open: {type: String} ,
          status_text: {type: String, trim:true}
})


const User = connection.model('User', UserSchema);

module.exports = connection;


// {"issue_title":"hh","issue_text":"hhh","created_on":"2020-10-19T16:38:10.411Z","updated_on":"2020-10-19T16:38:10.411Z","created_by":"hhh","assigned_to":"hh","open":true,"status_text":"hh","_id":"5f8dc0f2b052dc22fb6b52fb"} 