import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../../reducers/userReducer'
import { Button, Message, Header, Form as SemanticForm } from 'semantic-ui-react'
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'
import { TextInput } from '../FormField'


const LoginForm = (props) => {
  const [notification, setNotification] = useState('')

  const inputClass = props.colorScheme === 'dark' ? 'inputDark' : ''
  const textColor = props.textColor

  const handleLogin = async (values) => {
    const exception = await props.login(values.username, values.password)
    if (exception) {
      setNotification(exception.data.error)
    } else {
      toast.info(`Welcome ${values.username}`, {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={handleLogin}
    >
      {props => (
        <Form className='ui form'>
          <Header
            as='h2'
            style={{ color: textColor }}
          >
            Login
          </Header>
          <SemanticForm.Group inline widths='equal'>
            <TextInput
              name='username'
              placeholder='Username'
              type='text'
              inputClass={inputClass}
              textColor='white'
              id='login-username'
            />
            <TextInput
              name='password'
              placeholder='Password'
              type='password'
              inputClass={inputClass}
              textColor='white'
              id='login-password'
            />
            <Button
              type='submit'
              primary
              loading={props.isSubmitting}
              id='login-button'
            >
              Login
            </Button>
          </SemanticForm.Group>
          {notification !== '' && (
            <Message>
              {notification}
            </Message>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default connect(null, { login })(LoginForm)