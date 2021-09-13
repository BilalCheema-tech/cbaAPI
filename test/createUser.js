const config = require('config');
const request = require('supertest')(config.get('Covid.baseURL'));
const assert = require('chai').assert;

const app_token = config.get('Covid.token');
const user = "v1/user";
const randomUserName = Math.random().toString(36).substring(2,7);
const userData = {username: randomUserName, score: "1000"}

describe('Create User Request Tests', () => {

  it('Post User - Test', () => {
    
    var postUserRequest = `/${user}`;
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
      });
  });

  it('Post User - 400 Bad Request Error', () => {

    var postUserRequest = `/${user}`;
    return request
      .post(postUserRequest)
      .set('Accept',  'application/json')
      .set('Authorization',app_token)
      .send({userData}) //Posting incorrect payload
      .expect(400)
      .then((res) => {
        console.log("Status Code : " + res.statusCode)
        assert.equal(res.statusCode,400);
      });
  });

 });