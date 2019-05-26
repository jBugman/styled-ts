import * as React from 'react';
import styled from 'styled-components';

import { Place, placeDescription } from '../models/place';

export interface ItemProps {
  active?: boolean;
}

const Item = styled.li`
  background: ${(props: ItemProps) => props.active ? '#e9f6ff' : 'none'};
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  height: 50px;
  justify-content: space-between;
  padding: 16px 24px 15px 22px;
  width: 100%;
`

const Name = styled.div`
  color: #242424;
  height: 19px;
`

const Country = styled.span`
  color: #868686;
`

const Code = styled.div`
  color: #868686;
  font-weight: 500;
  height: 19px;
`

export interface SuggestionProps {
  onSelect?: (text: string) => void;
}

interface Props extends ItemProps, SuggestionProps {
  place: Place;
}

export const Suggestion = ({
  active = false,
  onSelect,
  place,
  ...props
}: Props) => {
  const handleClick = !!onSelect ? () => onSelect(placeDescription(place)) : null;

  return (
    <Item {...props} active={active} onClick={handleClick}>
      <Name>
        {place.name}, <Country>{place.country}</Country>
      </Name>
      <Code>{place.iata}</Code>
    </Item>
  );
}
