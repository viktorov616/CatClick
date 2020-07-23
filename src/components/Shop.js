import React, { useState, useEffect } from 'react';

import ShopItem from './ShopItem';
import styled from 'styled-components';
import ShopOpened from '../img/scroll_opened.png';
import ShopClosed from '../img/scroll_closed.png';
import shopConfig, { shopOrder } from '../configs/shop';
import produce from 'immer';

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

const StyledShopToggler = styled.div`
  height: 64px;
  width: 100%;
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
            <ShopItem
              key={item}
              code={item}
              buffDuration={buffDuration}
              isItemDisabled={isItemDisabled}
              cost={cost}
              itemClickHandler={itemClickHandler}
              shopStore={shopStore}
              shopConfig={shopConfig}
            />
          );
        })}
    </StyledShop>
  );
}
