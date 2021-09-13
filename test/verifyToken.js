const config = require('config');
const request = require('supertest')(config.get('Covid.baseURL'));
const assert = require('chai').assert;


const app_token = config.get('Covid.token');
const tokenRequest = "auth/verifytoken";

describe('Verify Authorisation of Token Tests:', () => {

  it('Get token verification - Test', () => {
    
    var getTokenRequest = `/${tokenRequest}`;
    return request
      .get(getTokenRequest)
      .set('Accept',  'application/json')
      .set('Authorization',app_token)
      .expect(200)
      .then((res) => {
        assert.isNotEmpty(res.body);
        var obj = JSON.parse(JSON.stringify(res.body));
        console.log("app_Id: " + obj[0].app_id + " app: " + obj[0].app)
      });
  });

  it('Auth: 403 Invalid Token Error', () => {
    const dummyToken = "TestTest"
    var getTokenRequest = `/${tokenRequest}`;
    return request
      .get(getTokenRequest)
      .set('Accept',  'application/json')
      .set('Authorization',dummyToken)
      .expect(403)
    });
});