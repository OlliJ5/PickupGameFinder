import React from 'react'
import { WithStore, Slider, Slide, ButtonNext } from 'pure-react-carousel'
import { Image, Header, Icon } from 'semantic-ui-react'
import intro1 from '../resources/intro/creategames.png'
import intro2 from '../resources/intro/createdgame.png'
import intro3 from '../resources/intro/joingames.png'

class CarouselLarge extends React.Component {
  render() {
    console.log('step', this.props.step)
    return (
      <div>
        <Slider>
          <Slide index={0}>
            <Header style={{ color: 'white' }}>Find games</Header>
            <Image wrapped src={intro2} />
          </Slide>
          <Slide index={1}>
            <Header style={{ color: 'white' }}>Create games</Header>
            <Image wrapped src={intro1} />
          </Slide>
          <Slide index={2}>
            <Header style={{ color: 'white' }}>Join games</Header>
            <Image wrapped src={intro3} />
          </Slide>
        </Slider>
        <div style={{ textAlign: 'center' }}>
          <ButtonNext className='ui massive icon circular primary button'>
            <Icon name='arrow right' />
          </ButtonNext>
        </div>
      </div>
    )
  }
}

export default WithStore(CarouselLarge, state => ({
  step: state.step
}))