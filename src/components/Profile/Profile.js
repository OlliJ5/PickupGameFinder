import React from 'react'
import { Container, Image, Segment, Grid, Menu, Card, Header } from 'semantic-ui-react'
import kobe from '../../resources/kobe.jpg'

const Profile = () => {

  console.log('kuva', kobe.height)
  return (
    <Container text style={{ marginTop: '5em' }}>
      <Segment>
        <Grid columns={3}>
          <Grid.Row stretched>
            <Grid.Column>
              <Image src={kobe} size='small' />
            </Grid.Column>
            <Grid.Column>
              <Header size='large' style={{ position: 'absolute', bottom: '0px' }}>
                Ogrousu
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Menu pointing secondary>
          <Menu.Item name='Created games' />
          <Menu.Item name='Game history' />
          <Menu.Item position='right' name='Settings' />
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
  )
}

export default Profile