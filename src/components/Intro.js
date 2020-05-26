import React from 'react'
import { Modal } from 'semantic-ui-react'
import { CarouselProvider } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import CarouselLarge from './CarouselLarge'

const Intro = () => {
  return (
    <Modal
      basic
      defaultOpen={true}
      centered={false}
      closeOnDimmerClick={false}
    >
      <CarouselProvider
        naturalSlideWidth={1}
        naturalSlideHeight={0.6}
        totalSlides={3}
      >
        <CarouselLarge />
      </CarouselProvider>
    </Modal>
  )
}

export default Intro