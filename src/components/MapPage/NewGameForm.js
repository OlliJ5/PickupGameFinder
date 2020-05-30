import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createGame } from '../../reducers/gameReducer'
import { Segment, Form as SemanticForm, Header, Button, Icon } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { Formik, Form } from 'formik'
import { TextInput } from '../FormField'
import * as yup from 'yup'

const NewGameForm = (props) => {
  const inputClass = props.colorScheme === 'dark' ? 'inputDark' : ''
  const textColor = props.colorScheme === 'dark' ? 'white' : 'black'
  const segmentClass = props.colorScheme === 'dark' ? 'segmentDarkest' : ''

  const radioValue = props.radioValue
  const setRadioValue = props.setRadioValue
  const location = props.location
  const latestClick = props.latestClick
  const setNewGameLocation = props.setNewGameLocation

  useEffect(() => {
    const selectedLocation = radioValue === 'curr' ? location : latestClick
    setNewGameLocation(selectedLocation)
  }, [latestClick, location, setNewGameLocation, radioValue])

  const closeForm = () => {
    if (props.viewport) {
      props.setFormVisible(false)
      props.setViewport({ ...props.viewport, height: '100vh' })
    } else {
      props.setFormVisible(false)
    }
  }

  const createNewGame = async (values, { setSubmitting }) => {
    const newGame = {
      durationMins: values.duration,
      location: props.newGameLocation,
      desc: values.description,
      maxParticipants: values.participants
    }

    try {
      await props.createGame(newGame)
      toast.info(`Created a game for ${values.participants} players!`, {
        position: toast.POSITION.TOP_CENTER
      })
      setSubmitting(false)
      setRadioValue('curr')
      props.setNewGameLocation({ lat: 0, lng: 0 })
      props.setLatestClick({ lat: 0, lng: 0 })
      closeForm()

    } catch (exception) {
      console.log('Exception', exception)
    }
  }

  return (
    <Segment className={segmentClass}>
      <Icon
        name='close'
        size='large'
        inverted={props.colorScheme === 'dark'}
        style={{ position: 'absolute', right: '0', top: '1' }}
        onClick={closeForm}
      />
      <Formik
        initialValues={{ duration: '', description: '', participants: 10 }}
        validationSchema={
          yup.object({
            duration: yup.number()
              .integer()
              .min(1, 'The game must go on for at least a minute')
              .max(180, 'The game cannot be longer than 180 minutes')
              .required(),
            description: yup.string()
              .min(5, 'Must be at least 5 characters')
              .max(140, 'Must be 140 characters or less')
              .required(),
            participants: yup.number()
              .required()
              .integer()
              .min(1, 'The game must have at least one player')
              .max(30, 'The game cannot have more than 30 players')
          })
        }
        onSubmit={createNewGame}
      >
        {formikProps => (
          <Form className='ui form'>
            <Header as='h2' style={{ color: textColor }}>
              Start a game!
            </Header>
            <SemanticForm.Group inline>
              <label style={{ color: textColor }}>Location</label>
              <SemanticForm.Radio
                value='select'
                checked={radioValue === 'select'}
                onChange={() => setRadioValue('select')}
              />
              <label style={{ color: textColor }}>Select from map</label>
              <SemanticForm.Radio
                value='curr'
                checked={radioValue === 'curr'}
                onChange={() => setRadioValue('curr')}
              />
              <label style={{ color: textColor }}>Your location</label>
            </SemanticForm.Group>
            <p style={{ color: textColor }}>lat: {props.newGameLocation.lat.toFixed(4)}</p>
            <p style={{ color: textColor }}>long: {props.newGameLocation.lng.toFixed(4)}</p>
            <TextInput
              label='Duration'
              name='duration'
              placeholder='Duration in mins (1-180)'
              type='number'
              inputClass={inputClass}
              textColor={textColor}
            />
            <TextInput
              label='Description'
              name='description'
              placeholder='Description (5-140 chars)'
              type='text'
              inputClass={inputClass}
              textColor={textColor}
            />
            <TextInput
              label='Maximum players'
              name='participants'
              placeholder='Max amount of participants (1-30)'
              type='number'
              inputClass={inputClass}
              textColor={textColor}
            />
            <Button
              type='submit'
              primary
              fluid
              loading={formikProps.isSubmitting}
              disabled={formikProps.isSubmitting}
              size='large'
              id='gamecreation-button'
            >
              Create a game
            </Button>
          </Form>
        )}
      </Formik>
    </Segment>
  )
}

const mapStateToProps = (state) => {
  return {
    location: state.location,
    colorScheme: state.colorScheme
  }
}

export default connect(mapStateToProps, { createGame })(NewGameForm)