import React, {
  useState,
  useEffect,
  useCallback,
  useReducer,
  useRef,
} from 'react';
import styled from 'styled-components';
import leaf from './img/bg1.jpg';
import StyledGlobal from './styles/globalStyles';
import Hero from './components/Hero';
import Foes from './components/Foes';
import Shop from './components/Shop';
import Money from './components/Money';
import { basicFormReducer } from './utils/hooks';
import { shopOrder } from './configs/shop';

import './App.css';

const HERO_BASE_DAMAGE = 250;

const StyledApp = styled.div`
  background-image: url(${leaf});
  background-repeat: no-repeat;
  background-size: 110%;
  height: 100%;
  position: relative;
`;

function App() {
  const [money, setMoney] = useState(0);
  const initialState = shopOrder.reduce(
    (result, item) => ({ ...result, [item]: 1 }),
    {}
  );
  const [shopStore, dispatch] = useReducer(basicFormReducer, initialState);
  const [buffDuration, setBuffDuration] = useState({});

  const [animateHero, setAnimateHero] = useState(false);
  const heroAttackDamage = HERO_BASE_DAMAGE * (shopStore.attackDamage || 1);

  const foeRef = useRef(null);

  const passiveMoney = useCallback(() => {
    setMoney((newMoney) => newMoney + 1 * shopStore.moneyMult);
  }, [shopStore.moneyMult]);

  useEffect(() => {
    setInterval(passiveMoney, 1000);
  }, [passiveMoney]);

  useEffect(() => {
    if (buffDuration.autoAttack?.active) foeRef.current.click();
  }, [buffDuration]);

  function purchaseHandler(itemCost) {
    setMoney((money) => Math.round(money - itemCost));
  }

  const handleFoeHit = useCallback(() => {
    setMoney((newMoney) => newMoney + 10 * shopStore.moneyBuff);
    setAnimateHero(true);
  }, [shopStore.moneyBuff]);

  return (
    <>
      <StyledGlobal />
      <StyledApp className="App">
        <Money money={money} />
        <Shop
          dispatch={dispatch}
          shopStore={shopStore}
          purchaseHandler={purchaseHandler}
          allMoney={money}
          buffDuration={buffDuration}
          setBuffDuration={setBuffDuration}
        />
        <Hero animateHero={animateHero} setAnimateHero={setAnimateHero} />
        <Foes
          handleFoeHit={handleFoeHit}
          heroAttackDamage={heroAttackDamage}
          foeRef={foeRef}
        />
      </StyledApp>
    </>
  );
}

export default App;
