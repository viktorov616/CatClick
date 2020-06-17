import React, { useState, useReducer } from "react";
import styled from "styled-components";
import ShopOpened from "../img/scroll_opened.png";
import ShopClosed from "../img/scroll_closed.png";
import MoneyBuff from "../img/upgrade_moneybag.png";
import CostCoins from "../img/cost_money.png";
import shopConfig, { shopOrder } from "../configs/shop";

const StyledShop = styled.div`
  width: 209px;
  height: ${(props) => (props.status ? 780 : 61)}px;
  display: block;
  left: 20px;
  top: 20px;
  position: absolute;
  background: url(${(props) => props.img});
`;

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
  flex-wrap: wrap;
  cursor: pointer;

  ${(props) =>
    props.disabled &&
    `
		opacity: 0.5;
		cursor: default;

	`}
`;

const StyledShopItemImage = styled.div`
  width: 60px;
  height: 60px;
  background-image: url(${MoneyBuff});
  background-size: contain;
  margin-right: 10px;
`;

const StyledShopMultiplier = styled.div`
  font-size: 14px;
  color: #11110f;
`;
const StyledMultiplierNumber = styled.div`
  span:first-child {
    font-size: 15px;
  }
  span:last-child {
    font-size: 30px;
  }
`;
const StyledShopToggler = styled.div`
  height: 64px;
  width: 100%;
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
`;

export default function Shop({
  moneyMult,
  dispatch,
  purchaseHandler,
  allMoney,
}) {
  const [shopStatus, setShopStatus] = useState(false);

  function itemClickHandler(cost) {
    if (allMoney >= cost) {
      purchaseHandler(cost);
      dispatch({
        type: "changeField",
        field: "moneyMult",
        value: moneyMult + 1,
      });
    }
  }

  return (
    <StyledShop status={shopStatus} img={shopStatus ? ShopOpened : ShopClosed}>
      <StyledShopToggler onClick={() => setShopStatus(!shopStatus)} />
      {shopStatus &&
        shopOrder.map((item) => {
          return (
            <StyledShopItem
              key={item}
              onClick={() => itemClickHandler(shopConfig[item].initialCost)}
              disabled={allMoney < shopConfig[item].initialCost}
            >
              <StyledShopItemImage />
              <StyledShopMultiplier>
                <StyledMultiplierNumber>
                  <span>x</span>
                  <span>{moneyMult}</span>
                </StyledMultiplierNumber>
              </StyledShopMultiplier>
              <StyledItemCost>{shopConfig[item].initialCost}</StyledItemCost>
            </StyledShopItem>
          );
        })}
    </StyledShop>
  );
}
