import React, { useState } from 'react'
import userService from '../../services/users'
import { Grid, Form, Segment, Button, Header } from 'semantic-ui-react'

const NewAccountForm = () => {
  const [newUsername, setNewUsername] = useState('')
  const [newName, setNewName] = useState('')
  const [newPassword, setNewPassword] = useState('')

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
    } catch (exception) {
      console.log('something went wrong')
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
            <Form.Input
              label="Username"
              placeholder="Username"
              value={newUsername}
              name="username"
              onChange={({ target }) => setNewUsername(target.value)}
            />
            <Form.Input
              label="Name"
              placeholder="Name"
              value={newName}
              name="name"
              onChange={({ target }) => setNewName(target.value)}
            />
            <Form.Input
              label="Password"
              placeholder='Password'
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