import React, {useState} from 'react'
import styled from 'styled-components';
import ShopOpened from '../img/scroll_opened.png';
import ShopClosed from '../img/scroll_closed.png';

const StyledShop = styled.div`
	width: 209px;
	height: ${props => props.status ? 780 : 61}px;
	display: block;
	left: 20px;
	top: 20px;
	position: absolute;
	background: url(${props => props.img});
`

export default function Shop() {
  const [shopStatus, setShopStatus] = useState(false);
  return (
    <StyledShop
			status={shopStatus}
			img={shopStatus ? ShopOpened : ShopClosed}
			onClick={() => setShopStatus(!shopStatus)}
    />
  )
}