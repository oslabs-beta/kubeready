import React from 'react';

const Signup = () => {
  //invoke all children inside MemoryContainer
  return (
    <div>
      <h2>Sign Up</h2>
      <form id="signup" action="/signup" method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <br />
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required />
        <br />
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <br />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
};
export default Signup;