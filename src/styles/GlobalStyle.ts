import { createGlobalStyle } from 'styled-components';
// 1. 설치한 styled-reset을 import 합니다.
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset} // css 리셋
  * {
    box-sizing: border-box;
  }

  html {
    height: 100%;
  }

  body {
    height: 100%;
    margin: 0;
    padding: 0;

    // pc 환경에서 좌우 여백
    background-color: #f0f2f5;

    // 기본 폰트 설정
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  #root {
    height: 100%;
  }

  button, input, textarea {
    font-family: inherit; // body의 폰트를 상속
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
