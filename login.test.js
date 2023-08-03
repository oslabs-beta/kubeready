// import necessary dependencies
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';



// import the login function (or whatever it's actually called)
const { } = require('');

beforeEach(() => {
  // not sure what to put here
  // listen for server?
})

afterEach(() => {
  // reset?
})

afterAll(() => {
  // close the server?
})

// unit tests for the login function
describe('login page', () => {
  describe('rendering', () => {
   beforeEach(() => {
    // ??????
   })
    test('check if username input is on the login page', () => {
      expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    });
    
    test('check if password input is on the login page', () => {
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });

    test('check if login button is on the login page', () => {
      // create login button
      const loginButton = screen.getbyRole('button', {name: 'Login'});
      expect(loginButton).toBeInTheDocument();
    })
  describe('behavior', () => {
    beforeEach(() => {
      // ???
    })
    test('user is navigated to dashboard after entering correct login credentials', async () => {
      // create a login button, username, and pass

      // user types in correct user and pass

      // assert the correct user and pass

      // user clicks login button

      // assert that the dashboard is in the document
    })
    test ('user sees error message after loggin in with incorrect credentials', () => {
      // creat a login button, username, and pass

      // user types in incorrect user and pass

      // assert the incorrect user and pass

      // user clicks login button

      // assert that the error message appears on page

      // assert that the user is taken back to the login page

    })
  })

  });
});
