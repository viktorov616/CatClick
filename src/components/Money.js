import React from 'react'
import MoneyBg from '../img/money_bg.png';
import Purse from '../img/moneybag.png'
import styled from 'styled-components'

const StyledMoney = styled.div`
  color: #d87f0e;
  user-select: none;
  background: url(${MoneyBg}) no-repeat;
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

  &::before {
    position: absolute;
    content: '';
    left: 10px;
    width: 100px;
    height: 88px;
    display: block;
    background-image: url(${Purse});
    scale: 0.8;
  }
`;

export default function Money({
  money
}) {
  return (
    <StyledMoney>{money}</StyledMoney>
  )
}
