import React from 'react'
import { Image, Modal, Divider, Button, Container } from 'semantic-ui-react'
import { CarouselProvider, Slider, Slide, ButtonNext, ButtonBack, Dot } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import intro1 from '../resources/intro/creategames.png'
import intro2 from '../resources/intro/createdgame.png'
import intro3 from '../resources/intro/joingames.png'

const Intro = () => {
  return (
    <Modal basic defaultOpen={true}>
      <CarouselProvider
        naturalSlideWidth={1}
        naturalSlideHeight={0.5}
        totalSlides={3}
      >
        <Slider>
          <Slide index={0}>
            <Image wrapped src={intro1} />
          </Slide>
          <Slide index={1}>
            <Image wrapped src={intro2} />
          </Slide>
          <Slide index={2}>
            <Image wrapped src={intro3} />
          </Slide>
        </Slider>
        <div style={{ textAlign: 'center' }}>
          <ButtonBack>BACK</ButtonBack>
          <ButtonNext>NEXT</ButtonNext>
        </div>
      </CarouselProvider>
    </Modal>
  )
}

export default Intro