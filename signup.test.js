//imports
import React from 'react';
//will need to import SignUp component
//import SignUpPage from
//use react testing library: provides virtual DOM environment to render and interact with components during testing
import { render, screen, fireEvent } from '@testing-library/react'

//describe: used to create test suite in our case Sign Up page unit tests live within describe block  

describe('signUpPage', () => {
  //does sign up page render form elements saved userInput, passwordInput, submitButton?
  test('renders sign-up form elements', () => {
    //renders signup page component in virtual DOM 
      render(<SignUpPage />);
      //querying virtual DOM to select element associated with what is inside getLabelByText
        //use screen queries to find elements
    const nameInput = screen.getByLabelText('Name');
      const userInput = screen.getByLabelText('Username');
      const passwordInput = screen.getByLabelText('Password');
      //query virtual DOM to find role button and  look for input associated with it 
      const submitButton = screen.getByRole('button', {name: 'Sign Up'});
      //write expect statements to verify specific elements are in rendered output of SignUpPage component
      expect(nameInput).toBeInTheDocument()
      expect(userInput).toBeInTheDocument()
      expect(passwordInput).toBeInTheDocument()
      expect(submitButton).toBeInTheDocument()
    })
//test: is an error message appearing if un or pw is missing?
test('display error if all input fields not filled', () => {
    //renders signup page component in jest environment 
    render(<SignUpPage />);
    const submitButton = screen.getByRole('button', {name: 'Sign Up'});
    //simulate submit form funcitonality
    fireEvent.click(submitButton);
    //query virtual DOM to find element that has id set to error 
    const errorMessage = screen.getByTestId('error');
    //write expect cases
    expect(errorMessage).toBeInDocument();
    expect(errorMessage.textContent).toBe("All input fields are required to be filled on form submission.")

})
  //test: is the error message removed upon a correct un and pw entry and submission?
  test('error message is removed when form submit is sucessful');
  render(<SignUpPage />);
   //querying virtual DOM to select element associated with what is inside getLabelByText
    const userInput = screen.getByLabelText('Username');
      const passwordInput = screen.getByLabelText('Password');
      const nameInput = screen.getByLabelText('test');
      //query virtual DOM to find role button and  look for input associated with it 
      const submitButton = screen.getByRole('button', {name: 'Sign Up'});
      //simulate when userInput field has changed 
      //fireEvent mimics a user typing into a field
      //set property of input fields to what user has typed into what is in value field
      fireEvent.change(nameInput, {target: {value: 'Noel'}})
      fireEvent.change(userInput, {target: {value: 'user1'}})
      fireEvent.change(passwordInput, {target: {value: 'pass1'}})
      fireEvent.click(submitButton)
    //look for element with attribute set to error message 
      const errorMessage = screen.queryByTestId('error-message')
      //expecting form submission to be successful so should not see error message in virutal DOM so result should be null
      expect(errorMessage).toBeNull();
  });


  //final test 
  
  //run tests by command: npm jest fileName