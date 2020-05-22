import React from 'react'
import { Image, Modal } from 'semantic-ui-react'
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import intro1 from '../resources/intro/creategames.png'
import intro2 from '../resources/intro/createdgame.png'
import intro3 from '../resources/intro/joingames.png'


const Intro = () => {
  return (
    <Modal defaultOpen={true}>
      <CarouselProvider
        naturalSlideWidth={1}
        naturalSlideHeight={1}
        totalSlides={3}
      >
        <Slider>
          <Slide tag="a" index={0}>
            <Image src={intro1} />
          </Slide>
          <Slide tag="a" index={1}>
            <Image src={intro2} />
          </Slide>
          <Slide tag="a" index={2}>
            <Image src={intro3} />
          </Slide>
        </Slider>
      </CarouselProvider>

    </Modal>
  )
}

export default Intro