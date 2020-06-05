import React, {useState, useEffect, useCallback} from 'react'
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
      width: calc(100% - ${(props) => (100 / props.maxHp * props.hp)}%);
      height: 100%;
      right: 0;
    }
  }
`

export default function Foe() {
  const passiveMoney = useCallback(() => {
    setMoney((newMoney) => (newMoney+1))
  }, []);

  useEffect(() => {
    setInterval(passiveMoney, 1000)
  }, [passiveMoney]);
  
  const maxHp = 1000;
  const [money, setMoney] = useState(0);
  const [hp, setHp] = useState(maxHp);

  return (
    <>
    <div style={{'color': 'white'}}>{money}</div>
    <StyledFoe 
      onClick={() => {
        setMoney((newMoney) => (newMoney+10));
        setHp(hp - (maxHp - 250));
      }}
      maxHp={maxHp}
      hp={hp}
    >
      <div className='hp-bar'></div>
    </StyledFoe>
    </>
  )
}
