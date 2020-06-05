import React from 'react';
import styled from 'styled-components'
import './App.css';
import leaf from './img/leaf.png';
import StyledGlobal from './styles/globalStyles';
import Hero from './components/Hero';

const StyledApp = styled.div`
  background-image: url(${leaf});
  height: 100%;
  background-size: 100%;
`

function App() {
  return (
    <>
      <StyledGlobal />
      <StyledApp className="App">
        <Hero />
      </StyledApp>
    </>
  );
}

export default App;
