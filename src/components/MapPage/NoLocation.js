import React from 'react'
import { Container, Message, Icon } from 'semantic-ui-react'

const NoLocation = () => (
  <Container>
    <Message icon warning>
      <Icon name='location arrow' />
      <Message.Content>
        <Message.Header>Pls, give location</Message.Header>
        Please accept or deny the use of your location to continue using the app
      </Message.Content>
    </Message>
  </Container>
)

export default NoLocation