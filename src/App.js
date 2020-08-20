import React, {
  useState,
  useEffect,
  useCallback,
  useReducer,
  useRef,
  useMemo,
} from 'react';
import styled from 'styled-components';
import StyledGlobal from './styles/globalStyles';
import Hero from './components/Hero';
import Foes from './components/Foes';
import Shop from './components/Shop';
import Background from './components/Background';
import Money from './components/Money';
import orderConfig from './configs/order';
import ColorThief from 'colorthief';

import { basicFormReducer, useSaveData } from './utils/hooks';
import { shopOrder } from './configs/shop';

import './App.css';

const HERO_BASE_DAMAGE = 250;

const StyledApp = styled.div`
  height: 100%;
  position: relative;
  ${({bgColor}) => bgColor && `background-color: rgb(${bgColor.join(',')});`}
  transition: background-color 2s ease;
  will-change: background-color;
`;

function App() {
  const [money, setMoney] = useState(+localStorage.getItem('money') || 0);
  const initialState = localStorage.getItem('shopStore')
    ? JSON.parse(localStorage.getItem('shopStore'))
    : shopOrder.reduce((result, item) => ({ ...result, [item]: 1 }), {});
  const [shopStore, dispatch] = useReducer(basicFormReducer, initialState);
  const [buffDuration, setBuffDuration] = useState(
    JSON.parse(localStorage.getItem('buffDuration') || '{}')
  );
  const [locationIndex, setLocationIndex] = useState(0);
  useSaveData({ money, shopStore, buffDuration });

  const [animateHero, setAnimateHero] = useState(false);
  const heroAttackDamage = HERO_BASE_DAMAGE * (shopStore.attackDamage || 1);

  const foeRef = useRef(null);
  const locationImage = require(`./img/${orderConfig[locationIndex].location}`);

  const bgColor = useMemo(() => {
    const cf = new ColorThief();
    const img = new Image();
    img.src = require(`./img/${orderConfig[locationIndex].location}`);
    const bgColor = img.complete ? cf.getColor(img, 200) : null;
    return bgColor;
  }, [locationIndex]);

  const passiveMoney = useCallback(() => {
    setMoney((newMoney) => newMoney + 1 * shopStore.moneyMult);
  }, [shopStore.moneyMult]);

  useEffect(() => {
    setInterval(passiveMoney, 1000);
  }, [passiveMoney]);

  useEffect(() => {
    if (buffDuration.autoAttack?.active) foeRef.current.click();
  }, [buffDuration]);

  // prefetch locations images
  useEffect(() => {
    orderConfig.forEach(({ location }) => {
      const img = new Image();
      img.src = require(`./img/${location}`);
    });
  }, []);

  function purchaseHandler(itemCost) {
    setMoney((money) => Math.round(money - itemCost));
  }

  const handleHitFoe = useCallback(() => {
    setMoney((newMoney) => newMoney + 10 * shopStore.moneyBuff);
    setAnimateHero(true);
  }, [shopStore.moneyBuff]);

  const setMoneyForKill = useCallback(({ foe }) => {
    setMoney((money) => money + foe.hp * 0.1);
  }, []);

  const handleTriggerNextLocation = useCallback(() => {
    setLocationIndex((index) =>
      index >= orderConfig.length - 1 ? 0 : index + 1
    );
  }, []);

  return (
    <>
      <StyledGlobal />
      <StyledApp className="App" bgColor={bgColor}>
        <Background key={locationIndex} bg={locationImage} />
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
          triggerNextFoeCallback={setMoneyForKill}
          handleHitFoe={handleHitFoe}
          heroAttackDamage={heroAttackDamage}
          foeRef={foeRef}
          handleTriggerNextLocation={handleTriggerNextLocation}
          order={orderConfig[locationIndex].foes}
          location={locationIndex}
        />
      </StyledApp>
    </>
  );
}

export default App;
