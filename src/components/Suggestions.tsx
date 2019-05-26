import * as React from 'react';
import styled from 'styled-components';

import { Place } from '../models/place'
import { Suggestion, SuggestionProps } from './Suggestion';

const List = styled.ul`
  background: #fff;
  box-shadow: 0 2px 4px 0 #d9d9d9;
`

export interface SuggestionsProps {
  activeIndex: number;
  places: Place[];
}

interface Props extends SuggestionsProps, SuggestionProps {}

export const Suggestions = ({
  activeIndex,
  onSelect,
  places,
  ...props
}: Props) =>
  <List {...props}>
    {places.map((place, index) =>
      <Suggestion
        active={activeIndex === index}
        key={`place-${index}`}
        place={place}
        onSelect={onSelect}
      />
    )}
  </List>
