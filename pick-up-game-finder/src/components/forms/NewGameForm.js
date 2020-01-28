import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createGame } from '../../reducers/gameReducer'
import { Grid, Segment, Form, Header, Button } from 'semantic-ui-react'

const NewGameForm = (props) => {
  const [duration, setDuration] = useState(1)
  const [desc, setDesc] = useState('')
  const [maxParticipants, setmaxParticipants] = useState(10)

  const createNewGame = async (event) => {
    event.preventDefault()
    const newGame = {
      durationMins: duration,
      location: props.location,
      desc,
      maxParticipants
    }

    props.createGame(newGame)
    setDuration(30)
    setDesc('')
    setmaxParticipants(10)
    props.toggler()
  }

  return (
    <Grid style={{ position:'absolute', top:'0', right:'0', zIndex:'999', marginTop:'35px', marginRight:'10px' }}>
      <Grid.Column>
        <Segment style={{ padding: '20px' }}>
          <Button size='mini' onClick={props.toggler}>
            x
          </Button>
          <Form onSubmit={createNewGame}>
            <Header as='h2' color='blue'>
              Start a game!
            </Header>
            <Form.Input
              type='number'
              // min={1}
              // max={180}
              label="Duration"
              placeholder="Duration"
              value={duration}
              name="Duration"
              onChange={({ target }) => setDuration(target.value)}
            />
            <Form.Input
              // minLength="10"
              // maxLength="140"
              label="Description"
              placeholder="Description"
              value={desc}
              name="Description"
              onChange={({ target }) => setDesc(target.value)}
            />
            <Form.Input
              type='number'
              // min={1}
              // max={30}
              label="Maximum amount of participants"
              placeholder='Max amount of participants'
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