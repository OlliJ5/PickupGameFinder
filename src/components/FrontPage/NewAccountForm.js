import React from 'react'
import userService from '../../services/users'
import { connect } from 'react-redux'
import { login } from '../../reducers/userReducer'
import { Grid, Segment, Button, Header } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { Formik, useField, Form } from 'formik'
import * as yup from 'yup'

const TextInput = ({ label, textColor, inputClass, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className='field'>
      <label htmlFor={props.id || props.name} style={{ color: textColor }}>{label}</label>
      <div className='fluid ui input'>
        <input className={inputClass} {...field} {...props} />
      </div>
      {meta.touched && meta.error ? (
        <div style={{ fontSize: '12px', color: 'red', marginTop: '0.25 rem' }}>{meta.error}</div>
      ) : ''}
    </div>
  )
}

const NewAccountForm = (props) => {
  const textColor = props.colorScheme === 'dark' ? 'white' : 'black'
  const inputClass = props.colorScheme === 'dark' ? 'inputDark' : ''
  const segmentClass = props.colorScheme === 'dark' ? 'segmentDark' : ''

  const createAccount = async (values, { setSubmitting }) => {
    try {
      const newUser = { ...values }
      await userService.create(newUser)
      props.login(newUser.username, newUser.password)
      toast.info(`Welcome ${newUser.username}`, {
        position: toast.POSITION.TOP_CENTER
      })
      setSubmitting(false)
    } catch (exception) {
      console.log('error occured', exception)
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
                  .max(15, 'Must be less than 15 characters')
                  .required(),
                name: yup.string()
                  .min(2, 'Must be at least 2 characters')
                  .max(30, 'Must be less than 30 characters')
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
                {console.log('propsit', props.isSubmitting)}
                <TextInput
                  label='Username'
                  name='username'
                  placeholder='Username (3-15 characters)'
                  type='text'
                  inputClass={inputClass}
                  textColor={textColor}
                />
                <TextInput
                  label='Name'
                  name='name'
                  placeholder='Name (2-30 characters)'
                  type='text'
                  inputClass={inputClass}
                  textColor={textColor}
                />
                <TextInput
                  label='Password'
                  name='password'
                  placeholder='Password (min. 5 characters)'
                  type='password'
                  inputClass={inputClass}
                  textColor={textColor}
                />
                <Button
                  type='submit'
                  primary
                  fluid
                  loading={props.isSubmitting ? true : false}
                  disabled={props.isSubmitting ? true : false}
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