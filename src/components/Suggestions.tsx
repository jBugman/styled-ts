import * as React from 'react';
import styled from 'styled-components';

import { Place } from '../models/place'
import { Suggestion, SuggestionProps, itemHeight } from './Suggestion';

const MAX_ITEMS = 6 // It looks better this way but now we should handle scroll on keyboard events

const List = styled.ul`
  background: #fff;
  box-shadow: 0 2px 4px 0 #d9d9d9;
  max-height: ${(MAX_ITEMS + 0.55) * itemHeight}px;
  overflow-y: scroll;
`

export interface SuggestionsProps {
  activeIndex: number;
  places: Place[];
}

interface Props extends SuggestionsProps, SuggestionProps { }

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
        indented={place.nested}
        key={`place-${index}`}
        place={place}
        onSelect={onSelect}
      />
    )}
  </List>
