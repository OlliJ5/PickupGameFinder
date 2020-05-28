import React from 'react'
import { WithStore, Slider, Slide, ButtonNext } from 'pure-react-carousel'
import { Image, Icon, Button } from 'semantic-ui-react'
import welcome from '../../resources/intro/welcome.png'
import findGames from '../../resources/intro/findGames.png'
import joinGame from '../../resources/intro/joinGame.png'
import createGame from '../../resources/intro/createGame.png'

class CarouselLarge extends React.Component {
  render() {
    return (
      <div>
        <Slider>
          <Slide index={0}>
            <Image
              wrapped
              src={welcome}
              as='a'
              href='http://www.freepik.com'
            />
            <p>Designed by upklyak</p>
          </Slide>
          <Slide index={1}>
            <Image wrapped src={findGames} />
          </Slide>
          <Slide index={2}>
            <Image wrapped src={joinGame} />
          </Slide>
          <Slide index={3}>
            <Image wrapped src={createGame} />
          </Slide>
        </Slider>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          {this.props.current < 3 && (
            <ButtonNext className='ui massive icon circular basic inverted button'>
              <Icon name='arrow right' />
            </ButtonNext>
          )}
          {this.props.current === 3 && (
            <Button
              className='ui massive icon green basic circular inverted'
              onClick={this.props.closeModal}
            >
              <Icon name='check' />
            </Button>
          )}
        </div>
      </div>
    )
  }
}

export default WithStore(CarouselLarge, state => ({
  current: state.currentSlide
}))