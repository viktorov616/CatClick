import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const StyledFoe = styled.div`
  background-image: url(${props => props.foeImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 300px;
  height: 475px;
  position: absolute;
  right: 175px;
  bottom: 20px;

  .hp-bar {
    width: 100%;
    height: 20px;
    top: -35px;
    position: absolute;
    background: red;
    border: 4px solid #440303;
    &:before {
      content: '';
      position: absolute;
      display: block;
      background: #fff;
      width: ${(props) => 100 - (100 / props.maxHp * props.hp)}%;
      height: 100%;
      right: 0;
    }
  }
`

export default function Foe({
  hp: maxHp,
  picture,
  triggerNextFoe,
  code,
  handleHitFoe,
}) {
  useEffect(() => {
    setHp(maxHp)
  }, [maxHp, code]);

  const [hp, setHp] = useState(maxHp);
  const foeImage = require(`../img/${picture}`)

  function handleSetHp() {
    if (hp <= 0 ) {
      triggerNextFoe()
    } else {
      setHp(hp - 250);
    }
  }

  return (
    <>
      <StyledFoe
        foeImage={foeImage}
        onClick={() => {
          handleHitFoe();
          handleSetHp();
        }}
        maxHp={maxHp}
        hp={hp}
      >
        <div className='hp-bar'></div>
      </StyledFoe>
    </>
  )
}
