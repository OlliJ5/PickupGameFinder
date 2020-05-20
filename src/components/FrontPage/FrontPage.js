import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import NewAccountForm from './NewAccountForm'
import LoginForm from './LoginForm'
import kobe from '../../resources/kobe.jpg'

const FrontPage = ({ colorScheme }) => {
  const textColor = colorScheme === 'dark' ? 'white' : 'black'
  return (
    <Grid columns={2}>
      <Grid.Row style={{ paddingBottom: '20px', paddingTop: '50px' }}>
        <Grid.Column>
        </Grid.Column>
        <Grid.Column>
          <LoginForm colorScheme={colorScheme} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header as='h1' style={{ color: textColor }}>
            Pickupgame finder
            <Header.Subheader style={{ color: textColor }}>
              Find local pickupgames and start balling
            </Header.Subheader>
          </Header>
          <img src={kobe} alt="Basketball legend Kobe Bryant" style={{ maxWidth: '60%', maxHeight: '60%' }} />
        </Grid.Column>
        <Grid.Column>
          <NewAccountForm colorScheme={colorScheme} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default FrontPage