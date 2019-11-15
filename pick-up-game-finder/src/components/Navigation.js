import React from 'react'
import { Menu, Segment } from 'semantic-ui-react'

const Navigation = () => {
  return (
    <Segment inverted>
      <Menu inverted pointing secondary>
        <Menu.Item
          name='home'
        />
      </Menu>
    </Segment>
  )
}

export default Navigation