import React, { useState, useReducer, useEffect } from 'react';
import styled from 'styled-components';
import ShopOpened from '../img/scroll_opened.png';
import ShopClosed from '../img/scroll_closed.png';
import CostCoins from '../img/cost_money.png';
import shopConfig, { shopOrder } from '../configs/shop';
import produce from 'immer';
import { secondsToMinutes } from '../utils/common';

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
  user-select: none;
`;

export default function Shop({
  shopStore,
  dispatch,
  purchaseHandler,
  allMoney,
  buffDuration,
  setBuffDuration,
}) {
  const [shopStatus, setShopStatus] = useState(false);
  useEffect(() => {
    let interval = null;

    Object.entries(buffDuration).forEach(([key, timer]) => {
      if (timer.active && timer.duration > 0) {
        interval = setTimeout(() => {
          setBuffDuration((oldBuffDuration) =>
            produce(oldBuffDuration, (draft) => {
              draft[key].duration -= 1;
            })
          );
        }, 1000);
      } else {
        clearInterval(interval);
        setBuffDuration(
          produce(buffDuration, (draft) => {
            draft[key].active = false;
          })
        );
        dispatch({
          type: 'changeField',
          field: key,
          value: 1,
        });
      }

      return () => {
        clearInterval(interval);
      };
    });
  }, [buffDuration, dispatch, setBuffDuration]);

  function itemClickHandler({ cost, field }) {
    purchaseHandler(cost);
    dispatch({
      type: 'changeField',
      field: field,
      value: shopStore[field] + 1,
    });

    console.log(shopConfig[field].duration);
    if (shopConfig[field].duration) {
      setBuffDuration(
        produce(buffDuration, (draft) => {
          draft[field] = { active: true, duration: shopConfig[field].duration };
        })
      );
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
                    <>
                      <span></span>
                      <span>
                        {secondsToMinutes(buffDuration[item]?.duration) || '-'}
                      </span>
                    </>
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
