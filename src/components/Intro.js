import React, { useState } from 'react'
import { Modal } from 'semantic-ui-react'
import { CarouselProvider } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import CarouselLarge from './CarouselLarge'

const Intro = () => {
  const [open, setOpen] = useState(true)

  return (
    <Modal
      basic
      open={open}
      centered={false}
      closeOnDimmerClick={false}
    >
      <CarouselProvider
        naturalSlideWidth={1}
        naturalSlideHeight={0.6}
        totalSlides={3}
      >
        <CarouselLarge closeModal={() => setOpen(false)} />
      </CarouselProvider>
    </Modal>
  )
}

export default Intro