import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Image, Segment, Grid, Menu, Card, Header, Divider, Radio } from 'semantic-ui-react'
import profilepic from '../../resources/placeholderprofilepic.png'
import NavigationBar from '../NavigationBar'
import gameService from '../../services/games'
import playerService from '../../services/players'
import { changeColor } from '../../reducers/colorSchemeReducer'

const Profile = ({ user, colorScheme, changeColor }) => {
  const [active, setActive] = useState('created')
  const [createdGames, setCreatedGames] = useState(null)
  const [participated, setParticipated] = useState(null)

  const segmentClass = colorScheme === 'dark' ? 'segmentDarkest' : ''
  const textColor = colorScheme === 'dark' ? 'white' : 'black'
  const cardColor = colorScheme === 'dark' ? '#192430' : ''

  useEffect(() => {
    console.log('haetaan pelejä')
    async function fetchData() {
      const created = await gameService.getByOwner(user.id)
      setCreatedGames(created.reverse())
      const participated = await playerService.getByUser(user.id)
      setParticipated(participated.reverse())
    }
    fetchData()
  }, [user.id])

  const toggleColor = () => {
    const color = colorScheme === 'light' ? 'dark' : 'light'
    changeColor(color)
  }

  return (
    <div>
      <NavigationBar />
      <Container text style={{ marginTop: '5em' }}>
        <Segment className={segmentClass}>
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column>
                <Image src={profilepic} circular size='small' />
              </Grid.Column>
              <Grid.Column>
                <Header size='large' style={{ position: 'absolute', bottom: '0px', color: textColor }}>
                  {user.username}
                </Header>
              </Grid.Column>
              <Grid.Column textAlign='right'>
                <p style={{ color: textColor }}>Dark</p>
                <Radio
                  toggle
                  checked={colorScheme === 'dark'}
                  onChange={toggleColor}
                  id='color-toggle'
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider />
          <Menu pointing secondary inverted={colorScheme === 'dark'}>
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
          <div>
            {createdGames && active === 'created' && (
              <div>
                {createdGames.map(game => (
                  <Card fluid key={game.id} style={{ backgroundColor: cardColor }}>
                    <Card.Content>
                      <Card.Meta style={{ color: textColor }} >
                        Game created by {game.owner.username}
                      </Card.Meta>
                      <Card.Description style={{ color: textColor }}>
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
                  <Card fluid key={participated.game.id} style={{ backgroundColor: cardColor }}>
                    <Card.Content>
                      <Card.Meta style={{ color: textColor }} >
                        Game created by {participated.game.owner.username}
                      </Card.Meta>
                      <Card.Description style={{ color: textColor }}>
                        {participated.game.desc}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Segment>
      </Container>

    </div >
  )
}

const mapStateToPorps = (state) => {
  return {
    user: state.user,
    colorScheme: state.colorScheme
  }
}

export default connect(mapStateToPorps, { changeColor })(Profile)