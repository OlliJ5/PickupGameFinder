import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Image, Segment, Grid, Menu, Card, Header, Button, Divider } from 'semantic-ui-react'
import profilepic from '../../resources/placeholderprofilepic.png'
import NavigationBar from '../NavigationBar'
import gameService from '../../services/games'
import playerService from '../../services/players'

const Profile = ({ user }) => {
  const [active, setActive] = useState('history')
  const [createdGames, setCreatedGames] = useState(null)
  const [participated, setParticipated] = useState(null)

  useEffect(() => {
    console.log('haetaan pelejä')
    async function fetchData() {
      const created = await gameService.getByOwner(user.id)
      setCreatedGames(created)
      const participated = await playerService.getByUser(user.id)
      setParticipated(participated)
    }
    fetchData()
  }, [user.id])

  return (
    <div>
      <NavigationBar />
      <Container text style={{ marginTop: '5em' }}>
        <Segment>
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column>
                <Image src={profilepic} circular size='small' />
              </Grid.Column>
              <Grid.Column>
                <Header size='large' style={{ position: 'absolute', bottom: '0px' }}>
                  {user.username}
                </Header>
              </Grid.Column>
              <Grid.Column textAlign='right'>
                <Button icon='setting' />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider />
          <Menu pointing secondary>
            <Menu.Item
              name='Created games'
              active={active === 'created'}
              onClick={() => setActive('created')}
            />
            <Menu.Item
              name='Game history'
              active={active === 'history'}
              onClick={() => setActive('history')}
            />
          </Menu>
          {createdGames && active === 'created' && (
            <div>
              {createdGames.map(game => (
                <Card fluid key={game.id}>
                  <Card.Content>
                    <Card.Meta >
                      Created by {game.owner.username}
                    </Card.Meta>
                    <Card.Description>
                      {game.desc}
                    </Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </div>
          )}
          {participated && active === 'history' && (
            <div>
              {participated.map(participated => (
                <Card fluid key={participated.game.id}>
                  <Card.Content>
                    <Card.Meta >
                      Game created by {participated.game.owner.username}
                    </Card.Meta>
                    <Card.Description>
                      {participated.game.desc}
                    </Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </div>
          )}
        </Segment>
      </Container>

    </div>
  )
}

const mapStateToPorps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToPorps)(Profile)