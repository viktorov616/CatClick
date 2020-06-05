import React from 'react'
import styled from 'styled-components'
import FoeImage from '../img/foe.png'

const StyledFoe = styled.div`
  background-image: url(${FoeImage});
  background-size: contain;
  background-repeat: no-repeat;
  width: 300px;
  height: 475px;
  position: absolute;
  right: 175px;
  bottom: 20px;
`

export default function Foe() {
  return (
    <StyledFoe />
  )
}
