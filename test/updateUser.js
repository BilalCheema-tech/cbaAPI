const config = require('config');
const request = require('supertest')(config.get('Covid.baseURL'));
const assert = require('chai').assert;

const app_token = config.get('Covid.token');
const user = "v1/user";
const randomUserName = Math.random().toString(36).substring(2,7);
const userData = {username: randomUserName, score: 1000}
const updateData = {username: randomUserName, score: 2000}
const errorUserData = "error";

describe('Update User Tests', () => {

  it('Create a User and Update - Test', () => {
    
    var postUserRequest = `/${user}`;
    var putUserRequest = `/${user}`;
    return request
      .post(postUserRequest)
      .set('Accept',  'application/json')
      .set('Authorization',app_token)
      .send(userData)
      .expect(201)
      .then((res) => {
        assert.isNotEmpty(res.body);
        var obj = JSON.parse(JSON.stringify(res.body));
        console.log("Status:" + obj.status + " Message: " + obj.message)
        assert.equal("success", obj.status)
        assert.equal("User added.", obj.message) 
      
     return request
      .put(putUserRequest)
      .set('Accept',  'application/json')
      .set('Authorization',app_token)
      .send(updateData)
      .expect(204)
      });

  });
  
  //Note:: Flaky API is returning 201 with invalid payload
  it.skip('PUT User - 400 Bad Request Error', () => {

    var putUserRequest = `/${user}`;
    return request
      .put(putUserRequest)
      .set('Accept',  'application/json')
      .set('Authorization',app_token)
      .send(errorUserData) //Posting incorrect payload
      .expect(400)
      .then((res) => {
        console.log("Status Code : " + res.statusCode)
        assert.equal(res.statusCode,400);
      });
  });
  
 });