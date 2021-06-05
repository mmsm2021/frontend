import React, {useContext} from "react";
import { createGlobalStyle } from 'styled-components';
import {Context} from "./Store";

export const lightTheme = {
    body: '#E2E2E2',
    text: '#363537',
    toggleBorder: '#FFF',
    gradient: 'linear-gradient(#39598A, #79D7ED)',
}

export const darkTheme = {
    body: '#363537',
    text: '#FAFAFA',
    toggleBorder: '#6B8096',
    gradient: 'linear-gradient(#091236, #1E215D)',
}
export const companyTheme = {
   body: '#363537',
   text: '#FAFAFA',
   toggleBorder: '#6B8096',
   gradient: 'linear-gradient(#091236, #1E215D)',

}
export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  body {
    align-items: center;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    margin: 0;
    padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }
  .app {
    height: 100%;
    width: 100%;
    display: flex;
    position: relative;
  }
  main {
    padding: 24px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
`


