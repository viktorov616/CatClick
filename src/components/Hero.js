import React from 'react'
import styled from 'styled-components';
import HeroImage from '../img/naruto.png'

const StyledHero = styled.div`
  background-image: url(${HeroImage});
  background-size: contain;
  background-repeat: no-repeat;
  width: 200px;
  height: 400px;
  position: absolute;
  left: 20px;
  bottom: 20px;
`

export default function Hero() {
  return (
    <StyledHero />
  )
}
