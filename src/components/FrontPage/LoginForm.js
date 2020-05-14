import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../../reducers/loginReducer'
import { Button, Form, Message, Header } from 'semantic-ui-react'
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
    <Form
      onSubmit={handleLogin}
    >
      <Header
        as='h2'
        inverted
      >
        Login
      </Header>
      <Form.Group
        inline
        widths='equal'
      >
        <div
          className='field'
        >
          <div
            className='ui fluid input'
          >
            <input
              id='login-username'
              style={{ color: 'white', backgroundColor: '#243447' }}
              type='text'
              placeholder='Username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
        </div>
        <div
          className='field'
        >
          <div
            className='ui fluid input'
          >
            <input
              id='login-password'
              style={{ color: 'white', backgroundColor: '#243447' }}
              type='password'
              placeholder='Password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
        </div>
        <Button
          color='blue'
          id='login-button'
        >
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