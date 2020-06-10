import React, {useState, useReducer} from 'react'
import styled from 'styled-components';
import ShopOpened from '../img/scroll_opened.png';
import ShopClosed from '../img/scroll_closed.png';
import MoneyBuff from '../img/upgrade_moneybag.png';

const StyledShop = styled.div`
	width: 209px;
	height: ${props => props.status ? 780 : 61}px;
	display: block;
	left: 20px;
	top: 20px;
	position: absolute;
	background: url(${props => props.img});

`

const StyledShopItem = styled.div`
	width: calc(100% - 90px);
	height: 60px;
	top: 75px;
	left: 50px;
	position: absolute;
	margin-right: 10px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
`

const StyledShopItemImage = styled.div`
	width: 60px;
	height: 60px;
	background-image: url(${MoneyBuff});
	background-size: cover;
	margin-right: 10px;
`

const StyledShopMultiplier = styled.div`
	font-size: 14px;
	color: #11110f;
	span:first-child {
		font-size: 10px;
	}
	span:last-child {
		font-size: 26px;
	}
`

const StyledShopToggler = styled.div`
	height: 64px;
	width: 100%;
`

export default function Shop({
	moneyMult,
	dispatch,
}) {
	const [shopStatus, setShopStatus] = useState(false);

  return (
    <StyledShop
			status={shopStatus}
			img={shopStatus ? ShopOpened : ShopClosed}
    >
			<StyledShopToggler onClick={() => setShopStatus(!shopStatus)} />
			{ shopStatus && (
				<StyledShopItem onClick={() => dispatch({
					type: 'changeField',
					field: 'moneyMult',
					value: moneyMult + 1,
					})}>
					<StyledShopItemImage />
					<StyledShopMultiplier>
						<span>x</span>
						<span>{moneyMult}</span>
					</StyledShopMultiplier>
				</StyledShopItem>
			) }
		</StyledShop>
  )
}