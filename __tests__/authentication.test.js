// import the 'supertest' library for testing HTTP endpoints
const request = require('supertest');
// set server URL to localhost 5050
const server = 'http://localhost:5050'

// authentication tests
describe('authentication', () => {
    it('should return a valid authentication token when given correct credentials', async () => {
      // create mock valid credentials
      const validCredentials = {
        username: 'valid_user',
        password: 'valid_pass'
      };
  
      // send a POST request to the login endpoint with the valid credentials
      const response = await request(server)
        .post('/login')
        .send(validCredentials);
  
      // assertion: expect the response body to have a 'token' property equal to 'mock_token'
      expect(response.body.token).toEqual('mock_token');
    });
  
    // should throw an error when logging in with incorrect credentials
    it('should throw an error when logging in with incorrect credentials', async () => {
      // create mock invalid credentials
      const invalidCredentials = {
        username: 'invalid_user',
        password: 'invalid_pass'
      };
  
      // send a POST request to the login endpoint with the invalid credentials
      // and expect the server to respond with a 401 status code
      const response = await request(server)
        .post('/login')
        .send(invalidCredentials);
  
      // assertion: expect the response body to have an 'error' property containing the error message
      expect(response.body.error).toEqual('Invalid username and password');
    });
  });
