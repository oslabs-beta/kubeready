import React from 'react';

const Login = () => {
  return (
    <div className="login">
      <form >
        <input 
            className="login-input"
            name="username"
            type="text"
            placeholder="Username"
        />
        <input 
          className="login-input"
          name="password"
          type="text"
          placeholder="Password"
        />
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login;