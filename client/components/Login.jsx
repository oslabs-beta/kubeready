import React from 'react';

const Login = () => {
  //invoke all children inside MemoryContainer
  return (
    <div>
      <h2>Login</h2>
      <form id="login" action="/login" method="post">
        <label for="login_username">Username:</label>
        <input type="text" id="login_username" name="username" required />
        <br />
        <label for="login_password">Password:</label>
        <input type="password" id="login_password" name="password" required />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};
export default Login;