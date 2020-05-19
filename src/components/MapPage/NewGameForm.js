import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createGame } from '../../reducers/gameReducer'
import { Grid, Segment, Form, Header, Button, Message, Icon } from 'semantic-ui-react'
import { toast } from 'react-toastify'

const NewGameForm = (props) => {
  const [duration, setDuration] = useState('')
  const [desc, setDesc] = useState('')
  const [maxParticipants, setmaxParticipants] = useState('')
  const [notification, setNotification] = useState('')

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

  const createNewGame = async (event) => {
    event.preventDefault()
    const newGame = {
      durationMins: duration,
      location: props.newGameLocation,
      desc,
      maxParticipants
    }
    const exception = await props.createGame(newGame)

    if (exception) {
      setNotification(exception.data.error)
    } else {
      toast.info(`Created a game for ${maxParticipants} players!`, {
        position: toast.POSITION.TOP_CENTER
      })
      setDuration('')
      setDesc('')
      setmaxParticipants(10)
      setNotification('')
      setRadioValue('curr')
      props.setNewGameLocation({ lat: 0, lng: 0 })
      props.setLatestClick({ lat: 0, lng: 0 })
      props.setFormVisible(false)
    }
  }

  if (!props.formVisible) {
    return (
      <Button
        primary
        style={{ position: 'absolute', top: '50px', right: '10px', zIndex: '9' }}
        onClick={() => props.setFormVisible(true)}
      >
        New Game
      </Button>
    )
  }

  return (
    <div>
      <Grid style={{ position: 'absolute', top: '0', right: '0', marginTop: '35px', marginRight: '10px', zIndex: '9' }}>
        <Grid.Column>
          <Segment className={segmentClass}>
            {/* <Button size='mini'
              onClick={() => props.setFormVisible(false)}
              style={{ border: '0', background: 'transparent', position: 'absolute', right: '0', top: '0' }}
            >
          </Button> */}
            <Icon
              name='close'
              size='large'
              inverted={props.colorScheme === 'dark'}
              style={{ position: 'absolute', right: '0', top: '1' }}
              onClick={() => props.setFormVisible(false)}
            />
            <Form onSubmit={createNewGame}>
              <Header as='h2' style={{ color: textColor }}>
                Start a game!
              </Header>
              {notification !== '' && (
                <Message>
                  {notification}
                </Message>
              )}
              <Header as='h4' style={{ color: textColor }}>Location</Header>
              <Form.Group inline>
                <Form.Radio
                  value='select'
                  checked={radioValue === 'select'}
                  onChange={() => setRadioValue('select')}
                />
                <label style={{ color: textColor }}>Select from map</label>
                <Form.Radio
                  value='curr'
                  checked={radioValue === 'curr'}
                  onChange={() => setRadioValue('curr')}
                />
                <label style={{ color: textColor }}>Use your location</label>
              </Form.Group>
              <p style={{ color: textColor }}>lat: {props.newGameLocation.lat.toFixed(4)}</p>
              <p style={{ color: textColor }}>long: {props.newGameLocation.lng.toFixed(4)}</p>
              <div className='field'>
                <Header as='h4' style={{ color: textColor }}>Duration</Header>
                <div className='ui fluid input'>
                  <input
                    id='duration'
                    className={inputClass}
                    type='number'
                    placeholder='Duration in mins (1-180)'
                    value={duration}
                    onChange={({ target }) => setDuration(target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <Header as='h4' style={{ color: textColor }}>Description</Header>
                <div className='ui fluid input'>
                  <input
                    id='description'
                    className={inputClass}
                    type='text'
                    placeholder='Description (5-140 chars)'
                    value={desc}
                    onChange={({ target }) => setDesc(target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <Header as='h4' style={{ color: textColor }}>Maximum Players</Header>
                <div className='ui fluid input'>
                  <input
                    id='participants'
                    className={inputClass}
                    type='number'
                    placeholder='Max amount of participants (1-30)'
                    value={maxParticipants}
                    onChange={({ target }) => setmaxParticipants(target.value)}
                  />
                </div>
              </div>
              <Button color='blue' fluid size='large' id='gamecreation-button'>
                Create a game
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    location: state.location,
    colorScheme: state.colorScheme
  }
}

export default connect(mapStateToProps, { createGame })(NewGameForm)