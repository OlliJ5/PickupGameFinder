import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import NewAccountForm from './forms/NewAccountForm'
import LoginForm from './forms/LoginForm'
import kobe from '../kobe.jpg'

const FrontPage = () => {
  return (
    <Grid columns={2}>
      <Grid.Row style={{  paddingBottom: '20px', paddingTop: '50px' }}>
        <Grid.Column>
        </Grid.Column>
        <Grid.Column>
          <LoginForm />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header as='h1' inverted>
            Pickupgame finder
            <Header.Subheader>
              Find local pickupgames and start balling
            </Header.Subheader>
          </Header>
          <img src={kobe} alt="Basketball legend Kobe Bryant" style={{ maxWidth: '60%', maxHeight: '60%' }} />
        </Grid.Column>
        <Grid.Column>
          <NewAccountForm />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}





export default FrontPage