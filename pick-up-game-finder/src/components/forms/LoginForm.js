import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../../reducers/loginReducer'
import { Button, Form, Message } from 'semantic-ui-react'
import { toast } from 'react-toastify'


const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    const exception = await props.login(username, password)

    if (exception) {
      setPassword('')
      setNotification(exception.data.error)
    } else {
      toast.info(`Welcome ${username}`, {
        position: toast.POSITION.TOP_CENTER
      })
    }
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
      {notification !== '' && (
        <Message>
          {notification}
        </Message>
      )}
    </Form>
  )
}

export default connect(null, { login })(LoginForm)