import React from 'react'
import styled from 'styled-components';
import HeroImage from '../img/naruto.png'

const StyledHero = styled.img`
  background-image: url(${HeroImage});
  background-size: 100%;
  background-repeat: no-repeat;
  width: 200px;
  height: 400px;
`

export default function Hero() {
  return (
    <StyledHero />
  )
}
