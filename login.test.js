// import necessary dependencies
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';



// import the login function (or whatever it's actually called)
const { } = require('');

beforeAll(() => {
  // not sure what to put here
  // listen for server?
  server.listen();
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
      const loginButton = screen.getByRole('button', {name: 'Login'});
      const userInput = screen.getByPlaceholderText('Username')
      const passwordInput = screen.getByPlaceholderText('Password');
      // user types in correct user and pass
      await userEvent.type(userInput, 'testuser')
      await userEvent.type(passwordInput, 'testpassword')
      // assert the correct user and pass
      expect(userInput.value).toBe('testuser')
      expect(passwordInput.value).toBe('testpassword')
      // user clicks login button
      await userEvent.click(loginButton);
      // assert that the dashboard is in the document
      waitFor(async() => {
        // *NOTE* REPLACE IFRAME NAME HERE
        await screen.findByTitle('NAME OF IFRAME')
        // assertion: expect the iframe to be in the document
        expect(screen.findByTitle('NAME OF THE IFRAME')).toBeInTheDocument();
      })
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
