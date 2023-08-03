//imports
import React from 'react';
//will need to import SignUp component
//import SignUpPage from
//use react testing library: provides virtual DOM environment to render and interact with components during testing
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
//docs: jest, react testing library, react router DOM, stack overflow. kubernet 

//react router dom: will handle routing and navigation between different pages or views 

//describe: used to create test suite in our case Sign Up page unit tests live within describe block  

describe('signUpPage', () => {
  //does sign up page render form elements saved userInput, passwordInput, submitButton?
  test('renders sign-up form elements', () => {
    //renders signup page component in virtual DOM 
      render(
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      );
    //querying virtual DOM to select element associated with what is inside getLabelByText, using screen queries to find elements
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
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter >
    );

    const submitButton = screen.getByRole('button', {name: 'Sign Up'});
    //simulate submit form funcitonality
    fireEvent.click(submitButton);
    
    //query virtual DOM to find element that has id set to error 
    const errorMessage = screen.getByTestId('error');
    //write expect cases
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage.textContent).toBe("All input fields are required to be filled on form submission.")

})
  //test: is the error message removed upon a correct un and pw entry and submission?
  test('error message is removed when form submit is sucessful');
  render(
   <MemoryRouter>
     <SignUpPage />
   </MemoryRouter>
  );
   //querying virtual DOM to select element associated with what is inside getLabelByText
    const userInput = screen.getByLabelText('Username');
      const passwordInput = screen.getByLabelText('Password');
      const nameInput = screen.getByLabelText('Name');
      //query virtual DOM to find role button and  look for input associated with it 
      const submitButton = screen.getByRole('button', {name: 'Sign Up'});
      // simulate user input in each of the input fields setting their values to 'testname', 'testuser', and 'testpass'.
      fireEvent.change(nameInput, {target: {value: 'testname'}})
      fireEvent.change(userInput, {target: {value: 'testuser'}})
      fireEvent.change(passwordInput, {target: {value: 'testpass'}})
      //simulate form submit 
      fireEvent.click(submitButton)
      //look for element with id set to error message 
      const errorMessage = screen.queryByTestId('error-message')
      //expecting form submission to be successful so should not see error message in virutal DOM so result should be null
      expect(errorMessage).toBeNull();
})


  //final test singup try and use jests async await fxnility instead of set timeout
  //check behavior of SignUp component when successful form submit happens
  test('display a success message and redirects to login page after form submits successfully', async () => {
      
    // mock form submission function
    const mockFormSubmit = jest.fn(() => Promise.resolve());
    
    // render the SignUpPage component within the MemoryRouter
    // create virtual environment for routing and navigation
    // render signup page within this virtual environment
    // pass the mockFormSubmit function as a prop to the SignUpPage component 
    render(
      <MemoryRouter>
        <SignUpPage handleSubmit={mockFormSubmit}/>
      </MemoryRouter>
      );

    // get elements from the rendered SignUpPage component
    const nameInput = screen.getByLabelText('Name');
    const userInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', {name: 'Sign Up'});
      
    // simulate change events on form inputs to update their values
    fireEvent.change (nameInput, {target: {name: 'name', value: 'testname' }})
    fireEvent.change (userInput, {target: {name: 'username', value: 'testuser' }})
    fireEvent.change (passwordInput, {target: {name: 'password', value: 'testpassword' }})

    //simulate click event triggers form submission
    fireEvent.click(submitButton);

    // check if the success message is displayed after form submission
    const successMessage = screen.getByTestId('success message');
    expect(successMessage).toBeInTheDocument();

    // check if the login page is rendered after successful form submission
    const loginPage = screen.getByText('Login Page');
    expect(loginPage).toBeInTheDocument();

    //write expectations for mock fxn how many times it is called and what args its called w/
    expect(mockFormSubmit).toBeCalledTimes(1);
    expect(mockFormSubmit).toBeCalledWith({
      name: 'testname',
      username: 'testuser',
      password: 'testpassword',
    })
  });




  //run tests by command: npm jest fileName