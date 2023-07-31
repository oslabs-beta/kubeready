import React  from 'react';

const Login = () => {
  //add alert component
 const handleSubmit = (e) => {
  e.preventDefault();
  // what goes here?
 }
  return (
    <div className="login">
      <button onSubmit={handleSubmit}>Show Alert</button>
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