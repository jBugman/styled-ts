import * as React from 'react';
import styled from 'styled-components';

import { Place, placeDescription } from '../models/place';

export const itemHeight = 50

interface ItemProps {
  active?: boolean;
  indented?: boolean;
}

const Item = styled.li`
  background: ${(props: ItemProps) => props.active ? '#e9f6ff' : 'none'};
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  height: ${itemHeight}px;
  justify-content: space-between;
  padding: 18px 24px 15px ${(props: ItemProps) => props.indented ? 42 : 22}px;
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
  font-size: 14px;
  font-weight: 500;
  height: 16px;
`

export interface SuggestionProps {
  onSelect?: (text: string) => void;
}

interface Props extends SuggestionProps, ItemProps {
  place: Place;
}

export const Suggestion = ({
  active,
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
