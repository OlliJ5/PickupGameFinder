import React from 'react'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { logOut } from '../reducers/loginReducer'

const Navigation = (props) => {
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
        onClick={() => props.logOut()}
      >
        Logout
      </Menu.Item>
    </Menu>
  )
}

export default connect(null, { logOut })(Navigation)