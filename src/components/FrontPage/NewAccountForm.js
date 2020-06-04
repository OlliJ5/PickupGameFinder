import React from 'react'
import userService from '../../services/users'
import { connect } from 'react-redux'
import { login } from '../../reducers/userReducer'
import { Grid, Segment, Button, Header } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { TextInput } from '../FormField'

const NewAccountForm = (props) => {
  const textColor = props.colorScheme === 'dark' ? 'white' : 'black'
  const inputClass = props.colorScheme === 'dark' ? 'inputDark' : ''
  const segmentClass = props.colorScheme === 'dark' ? 'segmentDarkest' : ''

  const createAccount = async (values, { setSubmitting, setFieldError }) => {
    try {
      const newUser = { ...values }
      await userService.create(newUser)
      props.login(newUser.username, newUser.password)
      toast.info(`Welcome ${newUser.username}`, {
        position: toast.POSITION.TOP_CENTER
      })
      setSubmitting(false)
    } catch (exception) {
      if (exception.response.data.error.includes('unique')) {
        setFieldError('username', 'Username already taken')
      }
    }
  }

  return (
    <Grid>
      <Grid.Column>
        <Segment className={segmentClass}>
          <Header as='h2' style={{ color: textColor }}>
            Sign up
          </Header>
          <Formik
            initialValues={{ username: '', name: '', password: '' }}
            validationSchema={
              yup.object({
                username: yup.string()
                  .min(3, 'Must be at least 3 characters')
                  .max(15, 'Must be 15 characters or less')
                  .required(),
                name: yup.string()
                  .min(2, 'Must be at least 2 characters')
                  .max(30, 'Must be 30 characters or less')
                  .required(),
                password: yup.string()
                  .min(5, 'Must be at least 5 characters')
                  .required()
              })
            }
            onSubmit={createAccount}
          >
            {props => (
              <Form className='ui form'>
                <TextInput
                  label='Username'
                  name='username'
                  placeholder='Username (3-15 characters)'
                  type='text'
                  inputClass={inputClass}
                  textColor={textColor}
                  id='username'
                />
                <TextInput
                  label='Name'
                  name='name'
                  placeholder='Name (2-30 characters)'
                  type='text'
                  inputClass={inputClass}
                  textColor={textColor}
                  id='name'
                />
                <TextInput
                  label='Password'
                  name='password'
                  placeholder='Password (min. 5 characters)'
                  type='password'
                  inputClass={inputClass}
                  textColor={textColor}
                  id='password'
                />
                <Button
                  type='submit'
                  primary
                  fluid
                  loading={props.isSubmitting}
                  disabled={props.isSubmitting}
                  size='large'
                  id='accountCreation-button'
                >
                  Sign up
                </Button>
              </Form>
            )}
          </Formik>
        </Segment>
      </Grid.Column>
    </Grid >
  )
}

export default connect(null, { login })(NewAccountForm)