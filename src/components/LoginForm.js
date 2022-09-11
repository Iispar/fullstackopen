import React from 'react'

const LoginForm = (props) => (
  <form onSubmit = {props.handleLogin}>
    <div>
            username
      <input
        type="text"
        value={props.username}
        name="Username"
        onChange={({ target }) => props.setUsername(target.value)}
        id='username'
      />
    </div>
    <div>
    password
      <input
        type="password"
        value={props.password}
        name="Password"
        onChange={({ target }) => props.setPassword(target.value)}
        id='password'
      />
    </div>
    <button type="submit" id='loginButton'> login </button>
  </form>
)

export default LoginForm