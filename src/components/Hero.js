import React from 'react'
import styled from 'styled-components';
import HeroImage from '../img/naruto.png'

const StyledHero = styled.div`
  background-image: url(${HeroImage});
  background-size: contain;
  background-repeat: no-repeat;
  width: 310px;
  height: 450px;
  position: absolute;
  left: 500px;
  bottom: 20px;
`

export default function Hero() {
  return (
    <StyledHero />
  )
}
