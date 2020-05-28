import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'semantic-ui-react'
import { CarouselProvider } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import CarouselLarge from './CarouselLarge'
import { disableIntro } from '../reducers/userReducer'

const Intro = ({ user, disableIntro }) => {
  const [open, setOpen] = useState(true)

  const closeModal = async () => {
    setOpen(false)
    disableIntro(user)
  }

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
        totalSlides={4}
      >
        <CarouselLarge closeModal={closeModal} />
      </CarouselProvider>
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { disableIntro })(Intro)