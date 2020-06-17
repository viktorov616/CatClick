import React, { useState, useEffect, useCallback, useReducer } from "react";
import styled from "styled-components";
import "./App.css";
import leaf from "./img/bg1.jpg";
import StyledGlobal from "./styles/globalStyles";
import Hero from "./components/Hero";
import Foes from "./components/Foes";
import Shop from "./components/Shop";
import Money from "./components/Money";
import { basicFormReducer } from "./utils/hooks";

const StyledApp = styled.div`
  position: relative;
  background-image: url(${leaf});
  height: 100%;
  background-size: 110%;
  background-repeat: no-repeat;
`;

function App() {
  const [money, setMoney] = useState(0);
  const initialState = { moneyMult: 1 };
  const [{ moneyMult }, dispatch] = useReducer(basicFormReducer, initialState);

  const passiveMoney = useCallback(() => {
    setMoney((newMoney) => newMoney + 1 * moneyMult);
  }, [moneyMult]);

  useEffect(() => {
    setInterval(passiveMoney, 1000);
  }, [passiveMoney]);

  function purchaseHandler(itemCost) {
    setMoney((money) => (money - itemCost));
  }

  return (
    <>
      <StyledGlobal />
      <StyledApp className="App">
        <Money money={money} />
        <Shop dispatch={dispatch} moneyMult={moneyMult} purchaseHandler={purchaseHandler} allMoney={money} />
        <Hero />
        <Foes handleFoeHit={() => setMoney((newMoney) => newMoney + 10)} />
      </StyledApp>
    </>
  );
}

export default App;
