import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../../reducers/loginReducer'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

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
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='blue' textAlign='center'>
          Log in to Pickupgame finder
        </Header>
        <Form size='large' onSubmit={handleLogin}>
          <Segment stacked>
            <Form.Input
              fluid icon='user'
              iconPosition='left'
              placeholder='username eg.basketballGod'
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />

            <Button color='blue' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          Or create an account
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default connect(null, { login })(LoginForm)