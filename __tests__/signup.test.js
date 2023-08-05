// imports to run tests
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
// history package provides a way to manage session history in JS environments
// history package is commonly incuded as a dependency when using React routing libraries like 'react-router-dom'
// history is a transitive dependency in react-router-dom (aka do not need to install separately)
import { createMemoryHistory } from 'history';
// **note**: will need to import signup page/functionality

// render sign up page
function renderSignUpPage() {
  render(
    <MemoryRouter>
      <SignUpPage />
    </MemoryRouter>
  );
}

describe('signUpPage', () => {
  test('renders sign-up form elements', () => {
    // before each test, render the sign up page (virtual environment)
      beforeEach(() => {
        renderSignUpPage();
      });

      // query virtual DOM to select elements
      // assertions
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Username')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
    });
    
  //test: is an error message appearing if un or pw is missing?
  test('display error if all input fields not filled', () => {
    const submitButton = screen.getByRole('button', {name: 'Sign Up'});
    // simulate submit form funcitonality
    fireEvent.click(submitButton);
    
    // query virtual DOM to find element that has id set to error 
    const errorMessage = screen.getByTestId('error');
    // assertions
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage.textContent).toBe("All input fields are required to be filled on form submission.")

  });

  test('error message is removed when form submit is successful', async () => {
    // querying virtual DOM to select elements
    const userInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const nameInput = screen.getByLabelText('Name');
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });

    // simulate user input in each of the input fields setting their values
    fireEvent.change(nameInput, { target: { value: 'testname' } });
    fireEvent.change(userInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });

    // simulate form submit
    fireEvent.click(submitButton);

    // wait for promise resolution
    await Promise.resolve();

    // look for the element with id set to error message
    const errorMessage = screen.queryByTestId('error-message');

    // assertion: form submission is successful, so the error message should not be present
    expect(errorMessage).toBeNull();
});

  test('display a success message and redirects to dashboard (homepage) after form submits successfully', async () => {
    // create a mock form submission function that resolves with a success response
    const mockFormSubmit = jest.fn(() => Promise.resolve({ success: true }));

    // create a history object to simulate navigation
    // this function creates a mock version of the navigation history, specifically for testing purposes
    const history = createMemoryHistory();

    // render the signuppage component within the MemoryRouter with the history
    render(
      // pass down history as a prop to mimic how the application would handle navigation in the browser
      // this allows us to validate that the sign-up form redirects the user to the homepage without needing to deal with a real browser or affect the actual URL
      <MemoryRouter history={history}>
        <SignUpPage handleSubmit={mockFormSubmit} />
      </MemoryRouter>
    );

    // get elements from the rendered signuppage component
    const nameInput = screen.getByLabelText('Name');
    const userInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });

    // simulate change events on form input fields to update their values
    fireEvent.change(nameInput, { target: { name: 'name', value: 'testname' } });
    fireEvent.change(userInput, { target: { name: 'username', value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'testpassword' } });

    // simulate click event triggers form submission
    fireEvent.click(submitButton);

    // check if the success message is displayed after form submission
    const successMessage = screen.getByTestId('success message');
    expect(successMessage).toBeInTheDocument();

    // assertion: the mockFormSubmit should be called with the correct form data
    expect(mockFormSubmit).toBeCalledTimes(1);
    expect(mockFormSubmit).toBeCalledWith({
      name: 'testname',
      username: 'testuser',
      password: 'testpassword',
    });

    // check if the user is redirected to the dashboard (homepage) after form submission
    expect(history.location.pathname).toBe('/homepage');
  });


  // NOTES:
  // libraries : jest, react testing library, react router DOM
  // react router dom: will handle routing and navigation between different pages or views 
  // use react testing library: provides virtual DOM environment to render and interact with components during testing
  // describe: used to create test suite in our case Sign Up page unit tests live within describe block  
  // run tests by command: npm jest fileName