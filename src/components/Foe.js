import React, {useState, useEffect, useCallback} from 'react'
import styled from 'styled-components'
import MoneyBg from '../img/money_bg.png';

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
const StyledMoney = styled.div`
  color: #d87f0e;
  user-select: none;
  background: url(${MoneyBg}) no-repeat;
  font-family: 'Manga';
  font-weight: 700;
  left: calc(50% - 150px);
  width: 300px;
  height: 73px;
  position: absolute;
  font-size: 30px;
  top: 10px;
  line-height: 82px;
  padding-left: 50px;
  text-shadow: 0 0 3px rgba(88, 51, 4, 0.5);
`;

export default function Foe({
  hp: maxHp,
  picture,
  triggerNextFoe,
  code
}) {
  const passiveMoney = useCallback(() => {
    setMoney((newMoney) => (newMoney+1))
  }, []);

  useEffect(() => {
    setInterval(passiveMoney, 1000)
  }, [passiveMoney]);

  useEffect(() => {
    setHp(maxHp)
  }, [maxHp, code]);
  
  const [money, setMoney] = useState(0);
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
      <StyledMoney>{money}</StyledMoney>
      <StyledFoe 
        foeImage={foeImage}
        onClick={() => {
          setMoney((newMoney) => (newMoney+10));
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
