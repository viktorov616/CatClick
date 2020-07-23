import React from 'react';

import styled from 'styled-components';
import { secondsToMinutes } from '../utils/common';
import CostCoins from '../img/cost_money.png';
import Line from '../img/line.png';

const StyledTooltip = styled.div`
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
`;

const StyledShopItem = styled.div`
  width: calc(100% - 90px);
  margin-right: 10px;
  display: flex;
  padding-left: 15px;
  cursor: pointer;
  flex-wrap: wrap;
  margin-bottom: 15px;
  position: relative;

  ${(props) =>
    props.disabled &&
    `
		opacity: 0.5;
		cursor: default;
	`}

  &::after {
    content: '';
    position: absolute;
    bottom: 5px;
    width: 100%;
    height: 5px;
    background-image: url(${Line});
    background-size: contains;
    background-repeat: no-repeat;
    /* background-position: 0% 50%; */
  }

  &:hover {
    ${StyledTooltip} {
      visibility: visible;
    }
  }
`;

const StyledShopItemName = styled.p`
  font-size: 12px;
  color: #11110f;
  margin-bottom: 5px;
  text-align: center;
  width: 100%;
`;
const StyledShopItemImage = styled.div`
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 50px;
  margin-right: 10px;
  width: 50px;
`;

const StyledShopMultiplier = styled.div`
  font-size: 14px;
  color: #11110f;
`;
const StyledMultiplierNumber = styled.div`
  margin-top: 15px;
  span:first-child {
    font-size: 15px;
  }
  span:last-child {
    font-size: 17px;
  }
`;

const StyledItemCost = styled.div`
  background-image: url(${CostCoins});
  background-size: 30%;
  background-repeat: no-repeat;
  background-position: 0% 50%;
  font-size: 25px;
  padding-left: 30px;
  color: #d87f0e;
  margin-top: 5px;
  user-select: none;
`;

export default function ShopItem({
  isItemDisabled,
  cost,
  itemClickHandler,
  code,
  buffDuration,
  shopStore,
  shopConfig,
}) {
  return (
    <StyledShopItem
      onClick={() => {
        if (!isItemDisabled) itemClickHandler({ cost, field: code });
      }}
      disabled={isItemDisabled}
    >
      <StyledShopItemName>{shopConfig[code].name}</StyledShopItemName>
      <StyledShopItemImage img={require(`../img/${shopConfig[code].img}`)} />
      <StyledShopMultiplier>
        <StyledMultiplierNumber>
          {shopConfig[code].duration ? (
            <>
              <span></span>
              <span>
                {secondsToMinutes(buffDuration[code]?.duration) || '-'}
              </span>
            </>
          ) : (
            <>
              <span>x</span>
              <span>{shopStore[code]}</span>
            </>
          )}
        </StyledMultiplierNumber>
      </StyledShopMultiplier>
      <StyledItemCost>{cost}</StyledItemCost>
      <StyledTooltip>{shopConfig[code].desc}</StyledTooltip>
    </StyledShopItem>
  );
}
