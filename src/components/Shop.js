import React, { useState, useReuducer } from 'react';
import styled from 'styled-components';
import ShopOpened from '../img/scroll_opened.png';
import ShopClosed from '../img/scroll_closed.png';
import CostCoins from '../img/cost_money.png';
import shopConfig, { shopOrder } from '../configs/shop';

const StyledShop = styled.div`
  width: 209px;
  height: ${(props) => (props.status ? 780 : 61)}px;
  display: flex;
  left: 20px;
  top: 20px;
  position: absolute;
  background: url(${(props) => props.img});
  justify-content: center;
  align-content: flex-start;
  flex-wrap: wrap;
`;

const StyledShopItem = styled.div`
  width: calc(100% - 90px);
  height: 90px;
  margin-right: 10px;
  display: flex;
  padding-left: 15px;
  cursor: pointer;
  flex-wrap: wrap;
  margin-bottom: 20px;

  ${(props) =>
    props.disabled &&
    `
		opacity: 0.5;
		cursor: default;

	`}
`;

const StyledShopItemImage = styled.div`
  background-image: url(${(props) => props.img});
  background-repeat: repeat;
  background-size: contain;
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
    font-size: 25px;
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
  shopStore,
  dispatch,
  purchaseHandler,
  allMoney,
}) {
  const [shopStatus, setShopStatus] = useState(false);
  const [buffDuration, setBuffDuration] = useState({});

  function buffCounter(field) {
    console.log('b', buffDuration);
    if (buffDuration[field]) {
      setBuffDuration({
        ...buffDuration,
        [field]: buffDuration[field] - 1,
      });
    }
  }

  function itemClickHandler({ cost, field }) {
    purchaseHandler(cost);
    dispatch({
      type: 'changeField',
      field: field,
      value: shopStore[field] + 1,
    });

    if (shopConfig[field].duration) {
      setTimeout(
        () =>
          dispatch({
            type: 'changeField',
            field: field,
            value: 1,
          }),
        shopConfig[field].duration * 1000
      );
      setBuffDuration({ ...buffDuration, [field]: shopConfig[field].duration });
      setInterval(() => buffCounter(field), 1000);
    }
  }

  return (
    <StyledShop status={shopStatus} img={shopStatus ? ShopOpened : ShopClosed}>
      <StyledShopToggler onClick={() => setShopStatus(!shopStatus)} />
      {shopStatus &&
        shopOrder.map((item) => {
          const initCost = shopConfig[item].initialCost;
          const cost =
            shopStore[item] === 1
              ? initCost
              : Math.round(
                  new Array(shopStore[item] - 1)
                    .fill('')
                    .reduce(
                      (result, a, index) =>
                        result + initCost * 0.1 * (index + 1),
                      initCost
                    )
                );
          const isItemDisabled =
            allMoney < cost ||
            (shopConfig[item].duration && shopStore[item] > 1);

          return (
            <StyledShopItem
              key={item}
              onClick={() => {
                if (!isItemDisabled) itemClickHandler({ cost, field: item });
              }}
              disabled={isItemDisabled}
            >
              <StyledShopItemImage
                img={require(`../img/${shopConfig[item].img}`)}
              />
              <StyledShopMultiplier>
                <StyledMultiplierNumber>
                  {shopConfig[item].duration ? (
                    buffDuration[item]?.duration || '-'
                  ) : (
                    <>
                      <span>x</span>
                      <span>{shopStore[item]}</span>
                    </>
                  )}
                </StyledMultiplierNumber>
              </StyledShopMultiplier>
              <StyledItemCost>{cost}</StyledItemCost>
            </StyledShopItem>
          );
        })}
    </StyledShop>
  );
}
