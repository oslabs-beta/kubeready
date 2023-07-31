import React from 'react';

const SignUp = () => {
  return (
    <div className="Sign Up">
      <form >
        <input
          className="signup-input"
          name="name"
          type="text"
          placeholder="Name"
        />
        <input 
          className="signup-input"
          name="username"
          type="text"
          placeholder="Create Username"
        />
        <input 
          className="signup-input"
          name="password"
          type="text"
          placeholder="Create Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp;