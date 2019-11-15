import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../../reducers/loginReducer'
import { Button, Form } from 'semantic-ui-react'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    props.login(username, password)
    setPassword('')
    setUsername('')
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group inline>
        <Form.Input
          icon='user'
          iconPosition='left'
          placeholder='Username'
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Input
          icon='lock'
          iconPosition='left'
          placeholder='Password'
          type='password'
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button color='blue'>
          Login
        </Button>
      </Form.Group>
    </Form>
  )
}

export default connect(null, { login })(LoginForm)