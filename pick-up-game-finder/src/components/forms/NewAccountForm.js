import React, { useState } from 'react'
import userService from '../../services/users'
import { connect } from 'react-redux'
import { login } from '../../reducers/loginReducer'
import { Grid, Form, Segment, Button, Header, Message } from 'semantic-ui-react'
import { toast } from 'react-toastify'

const NewAccountForm = (props) => {
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
      props.login(newUser.username, newUser.password)
      toast.info(`Welcome ${newUser.username}`, {
        position: toast.POSITION.TOP_CENTER
      })
    } catch (exception) {
      setNotification(exception.response.data.error)
    }
  }

  return (
    <Grid>
      <Grid.Column>
        <Segment style={{ padding: '20px', backgroundColor: '#1c2836' }}>
          <Form onSubmit={createAccount}>
            <Header as='h2' inverted>
              Sign up
            </Header>
            {notification !== '' && (
              <Message>
                {notification}
              </Message>
            )}
            <div className='field'>
              <label style={{ color: 'white' }}>Username</label>
              <div className='ui fluid input'>
                <input
                  style={{ color: 'white', backgroundColor: '#243447' }}
                  type='text'
                  placeholder='Username (3-15 characters)'
                  value={newUsername}
                  onChange={({ target }) => setNewUsername(target.value)}
                />
              </div>
            </div>
            <div className='field'>
              <label style={{ color: 'white' }}>Name</label>
              <div className='ui fluid input'>
                <input
                  style={{ color: 'white', backgroundColor: '#243447' }}
                  type='text'
                  placeholder='Name (2-30 characters)'
                  value={newName}
                  onChange={({ target }) => setNewName(target.value)}
                />
              </div>
            </div>
            <div className='field'>
              <label style={{ color: 'white' }}>Password</label>
              <div className='ui fluid input'>
                <input
                  style={{ color: 'white', backgroundColor: '#243447' }}
                  type='password'
                  placeholder='Password (min. 5 characters)'
                  value={newPassword}
                  onChange={({ target }) => setNewPassword(target.value)}
                />
              </div>
            </div>
            <Button color='blue' fluid size='large'>
              Sign up
            </Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default connect(null, { login })(NewAccountForm)