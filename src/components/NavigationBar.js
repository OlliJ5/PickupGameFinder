import React from 'react'
import { connect } from 'react-redux'
import { Menu, Dropdown } from 'semantic-ui-react'
import { logOut } from '../reducers/userReducer'
import { changeColor } from '../reducers/colorSchemeReducer'
import { Link } from 'react-router-dom'

const Navigation = (props) => {

  // const toggleColor = () => {
  //   const color = props.colorScheme === 'light' ? 'dark' : 'light'
  //   props.changeColor(color)
  // }

  const navBarColor = props.colorScheme === 'dark' ? '#141d26' : '#0E6EB8'

  return (
    <Menu borderless size='large' style={{ backgroundColor: navBarColor }}>
      <Menu.Item>
        <Link to='/home' style={{ color: 'white' }}>Home</Link>
      </Menu.Item>
      <Menu.Menu position='right'>
        <Dropdown item style={{ color: 'white' }} text={props.user.username}>
          <Dropdown.Menu style={{ backgroundColor: navBarColor }}>
            <Dropdown.Item>
              {/* <p style={{ color: 'white' }}>
                {props.colorScheme === 'light' ? 'Use Darkmode' : 'Use lightmode'}
              </p> */}
              <Link to='profile' style={{ color: 'white' }}>Profile</Link>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => props.logOut()} style={{ color: 'white' }}>
              <p style={{ color: 'white' }}>
                Logout
              </p>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  )
}

const mapStateToProps = (state) => {
  return {
    colorScheme: state.colorScheme,
    user: state.user
  }
}

export default connect(mapStateToProps, { logOut, changeColor })(Navigation)