import { createGlobalStyle } from 'styled-components';
import MangaR from '../fonts/mangat.ttf';
import MangaB from '../fonts/mangatb.ttf';
import MangaI from '../fonts/mangati.ttf';

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

  body, #root {
    height: 100%;
    min-height: 100%;
    font-family: 'Manga';
  }

  @font-face {
    font-family: 'Manga';
    src: url(${MangaR}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Manga';
    src: url(${MangaB}) format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Manga';
    src: url(${MangaI}) format('truetype');
    font-weight: 400;
    font-style: italic;
  }
`;

export default StylesGeneral;