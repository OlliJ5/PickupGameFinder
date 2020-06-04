import React from 'react'
import { Grid, Header, Responsive, Divider, Container, Segment } from 'semantic-ui-react'
import NewAccountForm from './NewAccountForm'
import LoginForm from './LoginForm'
import kobe from '../../resources/kobe.jpg'

const FrontPage = ({ colorScheme }) => {
  const textColor = colorScheme === 'dark' ? 'white' : 'black'
  const segmentClass = colorScheme === 'dark' ? 'segmentDarkest' : ''

  return (
    <div>
      <Responsive minWidth={768}>
        <Segment
          inverted
          style={{ minHeight: 600, padding: '1em 0em' }}
          vertical
        >
          <Container>
            <Grid columns={2} style={{ marginTop: '25px' }}>
              <Grid.Row>
                <Grid.Column>
                </Grid.Column>
                <Grid.Column>
                  <LoginForm colorScheme={colorScheme} textColor={'white'} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Header
              as='h1'
              inverted
              style={{
                fontWeight: 'normal',
                fontSize: '3em',
                marginBottom: 0,
                marginTop: '3em'
              }}
            >
              Pickupgame finder
            </Header>
            <Header
              as='h2'
              inverted
              style={{
                fontSize: '1.5em',
                fontWeight: 'normal',
                marginTop: '1em'
              }}
            >
              Find local pickupgames and start playing!<br /> Sign up below!
            </Header>
          </Container>
        </Segment>
        <Container>
          <Grid columns={2}>
            <Grid.Row style={{ marginTop: '100px' }}>
              <Grid.Column>
                <img src={kobe} alt="Basketball legend Kobe Bryant" style={{ maxWidth: '65%', maxHeight: '65%' }} />
              </Grid.Column>
              <Grid.Column>
                <NewAccountForm colorScheme={colorScheme} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Responsive>
      <Responsive maxWidth={767}>
        <Segment
          inverted
          textAlign='center'
          style={{ minHeight: 250, padding: '1em 0em' }}
          vertical
        >
          <Container text>
            <Header
              as='h1'
              inverted
              style={{
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: '2em'
              }}
            >
              Pickupgame finder
              <Header.Subheader
                style={{
                  fontWeight: 'normal',
                  marginTop: '0.5em'
                }}
              >
                Find local pickupgames and start playing!
              </Header.Subheader>
            </Header>
          </Container>
        </Segment>
        <Container>
          <Segment style={{ marginTop: '30px' }} className={segmentClass}>
            <LoginForm colorScheme={colorScheme} textColor={colorScheme === 'dark' ? 'white' : 'black'} />
          </Segment>
          <Divider horizontal>
            <p style={{ color: textColor }}>OR</p>
          </Divider>
          <NewAccountForm colorScheme={colorScheme} />
        </Container>
      </Responsive>
    </div >
  )
}

export default FrontPage