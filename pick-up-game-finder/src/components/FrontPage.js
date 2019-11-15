import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import NewAccountForm from './forms/NewAccountForm'
import LoginForm from './forms/LoginForm'

const FrontPage = () => {
  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column>
        </Grid.Column>
        <Grid.Column style={{ padding: '50px' }}>
          <LoginForm />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header size='huge'>
            Pickupgame finder
            <Header.Subheader>
              Find local pickupgames and start balling
            </Header.Subheader>
          </Header>
        </Grid.Column>
        <Grid.Column>
          <NewAccountForm />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}





export default FrontPage