/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var mongoose = require('mongoose');



var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

// const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});
require('dotenv').config();

const connection = require('../config/database.js')
const User = connection.models.User






module.exports = function (app) {

  app.route('/api/issues/:project')


  
    .get(function (req, res){
      /// https://issue-tracker.freecodecamp.rocks/api/issues/apitest?status_text=e
            console.log("dw query", req.query)
            //req.queery {} will be empty if no question mark after apitest
              let filterList = Object.assign(req.query);
              console.log(filterList)
      //  User.find({}, function(err,data){
         User.find(filterList, function(err,data){

          if (err){
             res.json("dw err...." + err.message);
          }

          res.send(data)


       })
      

    })
    
    
 

    .post(function (req, res){
      
                  // var project = req.body;
      //  console.log(project)/created_by

        let date = new Date().toDateString();
        const issue_title  = req.body.issue_title;
        const issue_text = req.body.issue_text;
        const created_by = req.body.created_by;
        const assigned_to = req.body.assigned_to ?  req.body.assigned_to: "";
        const status_text = req.body.status_text || "";
        const created_on = date;
        const updated_on = date; 
         const open =true; 

     
      // create new case
       let newObj = new User({
                      issue_title: issue_title,
                      issue_text:  issue_text,
                      created_by: created_by,
                      assigned_to:  assigned_to,
                      status_text:  status_text,
                      created_on: date,
                      updated_on: date, 
                      open: open   
                 });  


            // console.log(newObj)
      if(!issue_title || !issue_text || !created_by) {
        return res.send('missing required inputs');
      } else 
        
          newObj.save()
          .then((data)=>{

             
            //   console.log("sss",data._id)
            // console.log(data)
              // produce JSON data
              let resObj = {
                        issue_title,
                        issue_text,
                        created_on,
                        updated_on,
                        created_by,
                        assigned_to,
                        status_text,
                        open,
                        _id: data._id};

                        
            console.log("here...");
            res.json(resObj);

 // {"issue_title":"hh","issue_text":"hhh","created_on":"2020-10-19T16:38:10.411Z","updated_on":"2020-10-19T16:38:10.411Z","created_by":"hhh","assigned_to":"hh","open":true,"status_text":"hh","_id":"5f8dc0f2b052dc22fb6b52fb"}

          })
          .catch((err)=>{
            console.log("dw err", err.message);
            res.status(404).json("dw err...." + err.message);
          })

      
    })   ///<<end
    


    // "successfully updated"
    .put(function (req, res){
      
      let id = req.body._id;

      // console.log(req.params)
      // console.log(req.params._id)

        let date = new Date().toDateString();
        const issue_title  = req.body.issue_title;
        const issue_text = req.body.issue_text;
        const created_by = req.body.created_by;
        const assigned_to = req.body.assigned_to;
        const status_text = req.body.status_text ? req.body.status_text : false;
        const updated_on = date; 
        const open = req.body.open ? req.body.open : false; 

        
        console.log(id )

      const update = {
                      issue_title: issue_title,
                      issue_text:  issue_text,
                      created_by: created_by,
                      assigned_to:  assigned_to,
                      status_text:  status_text,
                      updated_on: date, 
                      open: open   

                    } 


    

        User.findByIdAndUpdate(id, update, function(err,data){
                   

        if(err){
            //console.log("dw err", err.message);
              if (err instanceof mongoose.CastError){
                    return res.send("could not update " + id);
              } else {
                  return res.send("dw err...." + err.message);
              }
            
        }

          console.log("data",data)
          console.log("id",id )

          //invalid id
       

        res.json("successfully updated")   

       })

     })   ///<<end
    
    
      // "successfully updated"
    .delete(function (req, res){
      
                  let id = req.body._id;

                   if(!id) {
                     return res.send('_id error')
                    } 
                  
                  User.findByIdAndRemove(id, function(err,data){
                  

                    if(err){
                        //console.log("dw err", err.message);
                          if (err instanceof mongoose.CastError){
                                return res.send("could not delete " +id);
                          } else {
                              return res.send("dw err...." + err.message);
                          }
                        
                    }

                    res.send('deleted ' + id)   

                
                  });

    })
    
};
