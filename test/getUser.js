const config = require('config');
const request = require('supertest')(config.get('Covid.baseURL'));
const assert = require('chai').assert;


const app_token = config.get('Covid.token');
const user = "v1/user";

describe('Get User Request Tests', () => {

  it('Get User - Test', () => {
    
    var getUserRequest = `/${user}`;
    return request
      .get(getUserRequest)
      .set('Accept',  'application/json')
      .set('Authorization',app_token)
      .expect(200)
      .then((res) => {
        assert.isNotEmpty(res.body);
        var obj = JSON.parse(JSON.stringify(res.body));
        console.log("first userId: " + obj[0].user_id + " first userName: " + obj[0].username + " first user's score: " + obj[0].score)
      });
  });

  it('Get User - 403 Invalid Token Error', () => {

    var getUserRequest = `/${user}`;
    return request
      .get(getUserRequest)
      .set('Accept',  'application/json')
      .set('Authorization','Invalid Token')
      .expect(403)
      .then((res) => {
        console.log("Status Code : " + res.statusCode)
        assert.equal(res.statusCode,403);
      });
  });

  it('Get User - 404 Invalid Request Error', () => {

    var getUserRequest = `/invalid`;
    return request
      .get(getUserRequest)
      .set('Accept',  'application/json')
      .set('Authorization',app_token)
      .expect(404)
      .then((res) => {
        console.log("Status Code : " + res.statusCode)
        assert.equal(res.statusCode,404);
      });
  });

});