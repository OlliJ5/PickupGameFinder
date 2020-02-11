import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createGame } from '../../reducers/gameReducer'
import { Grid, Segment, Form, Header, Button, Message, Icon } from 'semantic-ui-react'
import { toast } from 'react-toastify'

const NewGameForm = (props) => {
  const [duration, setDuration] = useState('')
  const [desc, setDesc] = useState('')
  const [maxParticipants, setmaxParticipants] = useState(10)
  const [notification, setNotification] = useState('')

  const createNewGame = async (event) => {
    event.preventDefault()
    const newGame = {
      durationMins: duration,
      location: props.location,
      desc,
      maxParticipants
    }
    const exception = await props.createGame(newGame)

    if (exception) {
      setNotification(exception.data.error)
    } else {
      toast.info(`Succesfully created a game for ${maxParticipants} people in your location`, {
        position: toast.POSITION.TOP_CENTER
      })
      setDuration('')
      setDesc('')
      setmaxParticipants(10)
      setNotification('')
      props.toggler()
    }
  }

  return (
    <Grid style={{ position: 'absolute', top: '0', right: '0', marginTop: '35px', marginRight: '10px' }}>
      <Grid.Column>
        <Segment style={{ padding: '20px', backgroundColor: '#141d26' }}>
          <Button size='mini'
            onClick={props.toggler}
            style={{ border: '0', background: 'transparent', position: 'absolute', right: '0', top: '0' }}
          >
            <Icon name='close' size='small' inverted />
          </Button>
          <Form onSubmit={createNewGame}>
            <Header as='h2' inverted>
              Start a game!
            </Header>
            {notification !== '' && (
              <Message>
                {notification}
              </Message>
            )}
            <div className='field'>
              <label style={{ color: 'white' }}>Duration</label>
              <div className='ui fluid input'>
                <input
                  style={{ color: 'white', backgroundColor: '#243447' }}
                  type='number'
                  placeholder='Duration in mins (1-180)'
                  value={duration}
                  onChange={({ target }) => setDuration(target.value)}
                />
              </div>
            </div>
            <div className='field'>
              <label style={{ color: 'white' }}>Description</label>
              <div className='ui fluid input'>
                <input
                  style={{ color: 'white', backgroundColor: '#243447' }}
                  type='text'
                  placeholder='Description (5-140 chars)'
                  value={desc}
                  onChange={({ target }) => setDesc(target.value)}
                />
              </div>
            </div>
            <div className='field'>
              <label style={{ color: 'white' }}>Maximum amount of participants</label>
              <div className='ui fluid input'>
                <input
                  style={{ color: 'white', backgroundColor: '#243447' }}
                  type='number'
                  placeholder='Max amount of participants (1-30)'
                  value={maxParticipants}
                  onChange={({ target }) => setmaxParticipants(target.value)}
                />
              </div>
            </div>
            <Button color='blue' fluid size='large'>
              Create a game
            </Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

const mapStateToProps = (state) => {
  return {
    location: state.location
  }
}

export default connect(mapStateToProps, { createGame })(NewGameForm)