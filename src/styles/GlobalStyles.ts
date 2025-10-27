"use client";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *,*::before,*::after{ box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: var(--font-iransans), sans-serif;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
  h1,h2,h3 { 
  margin: 8px 0;
   }
   button, h1,h2,h3,input { 
      font-family: var(--font-iransans), sans-serif;
}
`;

export default GlobalStyles;


