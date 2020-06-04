import React from 'react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { TextInput } from '../FormField'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { updateUser } from '../../reducers/userReducer'
import { toast } from 'react-toastify'

const UserInforForm = ({ user, updateUser }) => {

  const editAccount = async (values, { setSubmitting, setFieldError }) => {
    console.log('ja jes')
    try {
      const updatedUser = { ...user, username: values.username, name: values.name }
      const exception = await updateUser(updatedUser)
      if (exception) {
        console.log('virhe')
        if (exception.data.error.includes('unique')) {
          setFieldError('username', 'Username already taken')
        }
      }
      toast.info('User info updated', {
        position: toast.POSITION.TOP_CENTER
      })
      setSubmitting(false)
    } catch (exception) {
      console.log('something went wrong', exception)
    }
  }

  return (
    <Formik
      initialValues={{ username: user.username, name: user.name }}
      validationSchema={
        yup.object({
          username: yup.string()
            .min(3, 'Must be at least 3 characters')
            .max(15, 'Must be 15 characters or less')
            .required(),
          name: yup.string()
            .min(2, 'Must be at least 2 characters')
            .max(30, 'Must be 30 characters or less')
            .required()
        })
      }
      onSubmit={editAccount}
    >
      <Form className='ui form'>
        <TextInput
          label='Username'
          name='username'
          type='text'
        />
        <TextInput
          label='Name'
          name='name'
          type='text'
        />
        <Button
          type='submit'
          primary
        >
          Save changes
        </Button>

      </Form>

    </Formik>
  )
}

export default connect(null, { updateUser })(UserInforForm)