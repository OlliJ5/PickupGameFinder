import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createGame } from '../../reducers/gameReducer'
import { Grid, Segment, Form, Header, Button, Message } from 'semantic-ui-react'
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
    <Grid style={{ position: 'absolute', top: '0', right: '0', zIndex: '999', marginTop: '35px', marginRight: '10px' }}>
      <Grid.Column>
        <Segment style={{ padding: '20px' }}>
          <Button size='mini' onClick={props.toggler}>
            x
          </Button>
          <Form onSubmit={createNewGame}>
            <Header as='h2' color='blue'>
              Start a game!
            </Header>
            {notification !== '' && (
              <Message>
                {notification}
              </Message>
            )}
            <Form.Input
              type='number'
              // min={1}
              // max={180}
              label="Duration"
              placeholder="Duration in minutes (1-180 mins)"
              value={duration}
              name="Duration"
              onChange={({ target }) => setDuration(target.value)}
            />
            <Form.Input
              // minLength="5"
              // maxLength="140"
              label="Description"
              placeholder="Description (5-140 characters)"
              value={desc}
              name="Description"
              onChange={({ target }) => setDesc(target.value)}
            />
            <Form.Input
              type='number'
              // min={1}
              // max={30}
              label="Maximum amount of participants"
              placeholder='Max amount of participants (1-30 participants)'
              value={maxParticipants}
              name="maxParticipants"
              onChange={({ target }) => setmaxParticipants(target.value)}
            />

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