/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  var id;

    suite('POST /api/issues/{project} => object with issue data', function() {
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title,'Title')
          assert.equal(res.body.issue_text,'text')
          assert.equal(res.body.created_by,'Functional Test - Every field filled in')
          assert.equal(res.body.assigned_to,'Chai and Mocha')
          assert.equal(res.body.status_text,'In QA')
         
          //fill me in too!
          
          done();
        });
      });
      
      test('Required fields filled in', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title 1',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in'
         
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title,'Title 1')
          assert.equal(res.body.issue_text,'text')
          assert.equal(res.body.created_by,'Functional Test - Every field filled in')
          assert.equal(res.body.assigned_to,'')
          assert.equal(res.body.status_text,'')        
          //fill me in too!
          id = res.body._id;  // used for testing
          done();
        });

      });
      
      test('Missing required fields', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'hfffgg'
                  
        })
        .end(function(err, res){
          
          assert.equal(res.status, 200);
            assert.equal(res.text, 'missing required inputs');
        
          done();

      });
      
      });
    
    })  // end of first suite

    suite('PUT /api/issues/{project} => text', function() {
      
      test('No body', function(done) {
 
        chai.request(server)
        .put('/api/issues/test')
        .send({_id: id   
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
            // assert.equal(res.body, 'no updated field sent'); 
           assert.equal(res.body, 'successfully updated'); 
          done();
        });

        
      });
      
      test('One field to update', function(done) {

        chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: id,
          issue_title: 'Title'
         
        })
        .end(function(err, res){
          assert.equal(res.status, 200);  
          console.log("dw......", res.status) 
          assert.equal(res.body,'successfully updated');
           
          done();
        });
        
      });
      
              test('Multiple fields to update', function(done) {

                  
                chai.request(server)
                .put('/api/issues/test')
                .send({
                  _id: id,
                  issue_title: 'Title',
                  issue_text:'text',
                  created_by: 'Functional Test - Every field filled in',
                  assigned_to:'Chai and Mocha'
                
                })
                .end(function(err, res){
                  assert.equal(res.status, 200);
                   assert.equal(res.body,'successfully updated')
                  
                  
                  done();

                
              });
              
            });

    });    // end of second      issue_text
    
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('One filter', function(done) {
            
          chai.request(server)
        .get('/api/issues/test')
        .query({open: 'false'})
        .end(function(err, res){
              assert.equal(res.status, 200);
            assert.equal(res.body[0].open, 'false');


          done();
        });

        
      });


      
      
        test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
             chai.request(server)
        .get('/api/issues/test')
        .query({open: 'false', issue_title:'Title'})
        .end(function(err, res){
                 assert.equal(res.status, 200);
             assert.equal(res.body[0].open, 'false');
            assert.equal(res.body[0].issue_title,'Title');


          done();



        
         });
      
        });

    })  // end of suite
    
    suite('DELETE /api/issues/{project} => text', function() {
      
      test('No _id', function(done) {

        chai.request(server)
        .delete('/api/issues/test')
        .send({
        
                   
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
            assert.equal(res.text, '_id error');
                     
          done();
        });

      });
      
      test('Valid _id', function(done) {
        
          chai.request(server)
        .delete('/api/issues/test')
        .send({
          _id: id
          
        })
        .end(function(err, res){
         
          assert.equal(res.text, 'deleted ' + id)
         
         
          //fill me in too!
          
          done();
        });


      });
      
    });  // end of suite

 });   // end of main suite
 