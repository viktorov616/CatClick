import React from 'react';
import styled from 'styled-components'
import './App.css';
import leaf from './img/leaf.png';
import StyledGlobal from './styles/globalStyles';
import Hero from './components/Hero';
import Foe from './components/Foe';

const StyledApp = styled.div`
  position: relative;
  background-image: url(${leaf});
  height: 100%;
  background-size: 110%;
  background-repeat: no-repeat;
`

function App() {
  return (
    <>
      <StyledGlobal />
      <StyledApp className="App">
        <Hero />
        <Foe />
      </StyledApp>
    </>
  );
}

export default App;
