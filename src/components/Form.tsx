import * as React from 'react';
import styled from 'styled-components';

import { ConnectedSelect } from './ConnectedSelect';

export const Card = styled.div`
  width: 100%;
  box-shadow: 0 2px 4px 0 rgba(213, 213, 213, 0.5);
  background-color: #ffffff;
  padding: 75px 60px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  /**/
  margin-bottom: 50px;
`;

const Button = styled.button`
  background-color: #16a6ff;
  border-radius: 3px;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-size: 22px;
  font-weight: bold;
  height: 70px;
  outline: none;
  text-align: center;
  width: 100%;
`;

const doNothing = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log('fake submit');
};

export const Form = () => (
  <form onSubmit={doNothing}>
    <Card>
      <ConnectedSelect label="Origin" placeholder="i.e. Tegel Berlin" />
      <ConnectedSelect label="Destination" placeholder="i.e. Schiphol Amsterdam" />
    </Card>
    <Button>Search</Button>
  </form>
);
