import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Container, Image, Segment, Grid, Menu, Card, Header, Button, Divider } from 'semantic-ui-react'
import profilepic from '../../resources/placeholderprofilepic.png'
import NavigationBar from '../NavigationBar'

const Profile = ({ user }) => {
  const [active, setActive] = useState('created')

  console.log('user', user)
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
                <Button icon='setting'/>
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
          <Card fluid>
            <Card.Content>
              <Card.Header>
                peli
              </Card.Header>
            </Card.Content>
          </Card>
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