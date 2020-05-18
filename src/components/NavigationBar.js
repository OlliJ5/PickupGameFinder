import React from 'react'
import { connect } from 'react-redux'
import { Menu, Dropdown } from 'semantic-ui-react'
import { logOut } from '../reducers/loginReducer'
import { changeColor } from '../reducers/colorSchemeReducer'

const Navigation = (props) => {

  const toggleColor = () => {
    const color = props.colorScheme === 'light' ? 'dark' : 'light'
    props.changeColor(color)
  }

  return (
    <Menu inverted style={{ marginBottom: '0' }}>
      <Menu.Item
        name='home'
      >
        Home
      </Menu.Item>
      <Menu.Menu position='right'>
        <Dropdown item text='ogrousu'>
          <Dropdown.Menu>
            <Dropdown.Item onClick={toggleColor}>
              {props.colorScheme === 'light' ? 'Use Darkmode' : 'Use lightmode'}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => props.logOut()}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  )
}

const mapStateToProps = (state) => {
  return {
    colorScheme: state.colorScheme
  }
}

export default connect(mapStateToProps, { logOut, changeColor })(Navigation)