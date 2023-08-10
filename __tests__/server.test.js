// require in dependencies to run tests to run tests
// import the 'supertest' library for testing HTTP endpoints
const request = require('supertest');
// set server URL to localhost 5050
const server = 'http://localhost:5050'
// generate test username with the current timestamp
const testUserName = `test${Date.now()}`;
// define varable to hold auth token for the test user
let authToken;

// before each test, perform a signup request to create a test user
beforeEach(async () => {
  // send a POST request to the signup endpoint with the test username and password and return the result as a promise
  await request(server)
    .post('/signup')
    .send({ username: testUserName, password: '12345'});
});

// after all tests are completed, delete the test user created during signup
afterEach(async () => {
  // send a POST request to the delete endpoint with the test username and password and return the result as a promise
  await request(server)
    .post('/delete')
    .send({ username: testUserName, password: '12345'});
});

// backend tests
describe('backend', () => {
  // signup route tests
  describe('signup route', () => {
    it('should return 400 if username already exists', () => {
      // send a POST request to the signup endpoint with the same test username and expect the response status code to be 400 and the content-type header to be application/json
      return request(server)
        .post('/signup')
        .send({ username: testUserName, password: '12345'})
        .expect(400)
        .expect('Content-Type', /application\/json/)
    });
    
    it('should return specific error message for invalid signup', () => {
      // send a POST request to the signup endpoint with an invalid payload (missing password)
      return request(server)
        .post('/signup')
        .send({ username: 'test' })
        .expect(422)
        .expect('Content-Type', /application\/json/)
        .expect((res) => {
          // expect the response body to contain an 'error' property with a specific error message
          expect(res.body.error).toEqual('Password is required.');
        });
    });
  });

  // login route tests
  describe('login route', () => {
    it('should successfullyl login to a test account', () => {
      // send a POST request to the login endpoint with the test username and password and expect the response status code to be 201 and the content-type header to be application/json
      return request(server)
        .post('/login')
        .send({ username: testUserName, password: '12345'})
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .then((res) => {
          // store auth token for further tests
          authToken = res.body.token;
        });
    }, 25000) // set a timeout of 25000 ms (25 s)

    // **NOTE**: noticed that the test below is essentially testing the same functionality as a test on the login test file

    // it('should return 401 with invalid user credentials', () => {
    //   // send a POST request to the login endpoint with the invalid user credentials and expect the response status code to be 401 and the content-type header to be application/json
    //   return request(server)
    //     .post('/login')
    //     .send({ username: 'test' })
    //     .expect(401)
    //     .expect('Content-Type', /application\/json/)
    // });
  });
});