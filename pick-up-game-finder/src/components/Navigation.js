import React from 'react'
import { Menu } from 'semantic-ui-react'

const Navigation = () => {
  return (
    <Menu inverted style={{ marginBottom: '0' }}>
      <Menu.Item
        name='home'
      >
        Home
      </Menu.Item>
      <Menu.Item
        position='right'
        name='settings'
      >
        Logout
      </Menu.Item>
    </Menu>
  )
}

export default Navigation