import { createGlobalStyle } from 'styled-components';

const StylesGeneral = createGlobalStyle`
  * {
    &,
    &:before,
    &:after {
      box-sizing: border-box;
    }
  }

  html {
    height: 100%;
    min-height: 100%;
  }

  @keyframes fade-in {
    0% {
      opacity: 0
    }
    100% {
      opacity: 1
    }
  }
`;

export default StylesGeneral;
