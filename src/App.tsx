import * as React from 'react';
import reset from 'styled-reset';
import styled, { createGlobalStyle } from 'styled-components';

import { Form } from './components/Form';

const bgImage = require('./static/background.jpg');

const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body, #root {
    height: 100%;
  }
`

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: top center url(${bgImage}) #234f77 no-repeat;
  background-size: cover;
`

const fakeContentPadding = 10; // form shadow fix

const Content = styled.div`
  box-sizing: border-box;
  height: 100%;
  margin: 0 auto;
  overflow: auto;
  padding: 0 ${fakeContentPadding}px;
  width: ${1080 + 2 * fakeContentPadding}px;
`

const Title = styled.h1`
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
  font-size: 30px;
  font-weight: 900;
  height: 35px;
  line-height: 35px;
  text-align: center;
  width: 221px;
  /**/
  margin: 84px 0 62px;
`

export const App = () =>
  <>
    <GlobalStyle />
    <Background>
      <Content>
        <Title>Find your flights</Title>
        <Form />
      </Content>
    </Background>
  </>
