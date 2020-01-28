import React, { useState } from 'react'
import userService from '../../services/users'
import { Grid, Form, Segment, Button, Header, Message } from 'semantic-ui-react'

const NewAccountForm = () => {
  const [newUsername, setNewUsername] = useState('')
  const [newName, setNewName] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [notification, setNotification] = useState('')

  const createAccount = async (event) => {
    event.preventDefault()
    try {
      const newUser = {
        username: newUsername,
        name: newName,
        password: newPassword
      }
      await userService.create(newUser)
      setNewUsername('')
      setNewName('')
      setNewPassword('')
      setNotification('')
      console.log('luotiin', newUser)
    } catch (exception) {
      setNotification(exception.response.data.error)
    }
  }

  return (
    <Grid>
      <Grid.Column>
        <Segment style={{ padding: '20px' }}>
          <Form onSubmit={createAccount}>
            <Header as='h2' color='blue'>
              Sign up
            </Header>
            {notification !== '' &&(
              <Message>
                {notification}
              </Message>
            )}
            <Form.Input
              // minLength={3}
              // maxLength={15}
              label="Username"
              placeholder="Username (3-15 characters)"
              value={newUsername}
              name="username"
              onChange={({ target }) => setNewUsername(target.value)}
            />
            <Form.Input
              // minLength={2}
              // maxLength={30}
              label="Name"
              placeholder="Name (2-30 characters)"
              value={newName}
              name="name"
              onChange={({ target }) => setNewName(target.value)}
            />
            <Form.Input
              // minLength={5}
              label="Password"
              placeholder='Password (min. 5 characters)'
              value={newPassword}
              type='password'
              name="password"
              onChange={({ target }) => setNewPassword(target.value)}
            />

            <Button color='blue' fluid size='large'>
              Sign up
            </Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default NewAccountForm