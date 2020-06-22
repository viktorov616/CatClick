import React, { useState, useEffect, useCallback, useReducer } from 'react';
import styled from 'styled-components';
import leaf from './img/bg1.jpg';
import StyledGlobal from './styles/globalStyles';
import Hero from './components/Hero';
import Foes from './components/Foes';
import Shop from './components/Shop';
import Money from './components/Money';
import { basicFormReducer } from './utils/hooks';
import './App.css';

const StyledApp = styled.div`
  background-image: url(${leaf});
  background-repeat: no-repeat;
  background-size: 110%;
  height: 100%;
  position: relative;
`;

function App() {
  const [money, setMoney] = useState(0);
  const initialState = { moneyMult: 1 };
  const [{ moneyMult }, dispatch] = useReducer(basicFormReducer, initialState);
  const [animateHero, setAnimateHero] = useState(false);

  const passiveMoney = useCallback(() => {
    setMoney((newMoney) => newMoney + 1 * moneyMult);
  }, [moneyMult]);

  useEffect(() => {
    setInterval(passiveMoney, 1000);
  }, [passiveMoney]);

  function purchaseHandler(itemCost) {
    setMoney((money) => money - itemCost);
  }

  const handleFoeHit = useCallback(() => {
    setMoney((newMoney) => newMoney + 10);
    setAnimateHero(true);
  }, []);

  return (
    <>
      <StyledGlobal />
      <StyledApp className="App">
        <Money money={money} />
        <Shop
          dispatch={dispatch}
          moneyMult={moneyMult}
          purchaseHandler={purchaseHandler}
          allMoney={money}
        />
        <Hero animateHero={animateHero} setAnimateHero={setAnimateHero} />
        <Foes handleFoeHit={handleFoeHit} />
      </StyledApp>
    </>
  );
}

export default App;
