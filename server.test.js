// require in dependencies


it('should return a valid authentication token when given correct credentials', async () => {
    // create mock valid credentials
    const validCredentials = {
        username: 'valid_user',
        password: 'valid_pass'
    };
    // assign result to invocation of login passing in the user and pass
    const result = await login(validCredentials.username, validCredentials.password);
    // assertion: expect the result's token to equal 'mock_token'
    expect(result.token).toEqual('mock_token');
  });
  
  it('should throw an error when logging in with incorrect credentials', async () => {
  // create mock invalid credentials
  const invalidCredentials = {
    username: 'invalid_user',
    password: 'invalid_pass'
  };
  // expect the login function passing in the invalid user and pass to reject and throw an error
  await expect(login(invalidCredentials.username, invalidCredentials.password)).rejects.toThrow('Invalid username and password');
  });
