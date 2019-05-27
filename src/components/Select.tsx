import * as React from 'react';
import styled from 'styled-components';
import { debounce } from 'debounce';

import { Suggestions, SuggestionsProps } from './Suggestions';
import { Place, placeDescription } from '../models/place';

const MIN_SYMBOLS_CUTOFF = 3
const SUGGESTIONS_DELAY = 300

const Field = styled.div`
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: column;
  height: 60px;
  padding-right: 25px;
  position: relative;
  width: 440px;
`

const PositionedSuggestions = styled(Suggestions)`
  width: 100%;
  z-index: 100;
  position: absolute;
  top: 61px;
`

const Label = styled.div`
  color: #bbbbbb;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  height: 16px;
`

const Input = styled.input`
  border: none;
  caret-color: #242424;
  color: #242424;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 500;
  height: 24px;
  margin-top: 6px;
  outline: none;
  width: 100%;
  ::placeholder {
    color: #bbbbbb;
  }
`

const DeleteButton = styled.button`
  border: none;
  bottom: 23px;
  color: #bbbbbb;
  cursor: pointer;
  font-size: 16px;
  height: 10px;
  line-height: 16px;
  outline: none;
  padding: 0;
  position: absolute;
  right: 6px;
  width: 10px;
  :hover {
    color: #16a6ff;
  }
`

interface UnderlineProps {
  active?: boolean;
}

const Underline = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  border-bottom: ${(props: UnderlineProps) => !!props.active ? '2px solid #16a6ff' : '1px solid #e7e7e7'};
`

export interface SelectProps {
  defaultValue?: string;
  label: string;
  placeholder?: string;
}

interface Props extends SelectProps {
  onSuggestionsCancel: () => void;
  onSuggestionsLoad: () => void;
  onTextChange: (text: string) => void;
  places: Place[],
  showSuggestions: boolean;
  text: string;
}

interface State {
  activeIndex: number;
}

export class Select extends React.Component<Props, State> {

  state: State = {
    activeIndex: 0,
  }

  loadSuggestions = debounce(this.props.onSuggestionsLoad, SUGGESTIONS_DELAY)

  handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value || '';
    e.preventDefault();
    this.props.onTextChange(text);
    if (text.length >= MIN_SYMBOLS_CUTOFF) {
      this.loadSuggestions();
    } else {
      this.loadSuggestions.clear();
      this.props.onSuggestionsCancel();
    }
  }

  handleSuggestionSelect = (text: string) => {
    this.setState({ activeIndex: 0 });
    this.props.onTextChange(text);
    this.props.onSuggestionsCancel();
  }

  handleClear = () => {
    this.setState({ activeIndex: 0 });
    this.props.onTextChange('');
    this.props.onSuggestionsCancel();
  }

  handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!this.props.showSuggestions) {
      return;
    }
    // console.log('keypress', e.key, e.keyCode);
    const places = this.props.places;
    var idx = this.state.activeIndex;
    // up
    if (e.keyCode === 38) {
      idx = Math.max(0, idx - 1);
      this.setState({ activeIndex: idx });
    }
    // down
    if (e.keyCode === 40) {
      idx = Math.min(Math.max(places.length - 1, 0), idx + 1);
      this.setState({ activeIndex: idx });
    }
    // enter
    if (e.keyCode === 13) {
      // It should actually react to space, but for now it complicates things too much
      if (places.length === 0) {
        return;
      }
      e.preventDefault();
      const selectedPlace = places[this.state.activeIndex];
      const text = placeDescription(selectedPlace);
      this.handleSuggestionSelect(text);
    }
    // esc
    if (e.keyCode === 27) {
      this.props.onSuggestionsCancel();
    }
  }

  render() {
    const {
      label,
      placeholder,
      places,
      showSuggestions,
      text,
      // omit
      onSuggestionsCancel,
      onSuggestionsLoad,
      onTextChange,
      //
      ...props
    } = this.props;

    return (
      <Field {...props}>
        <Label>{label}</Label>
        <Input
          type="text"
          value={text}
          onChange={this.handleTextChange}
          onKeyDown={this.handleKeyPress}
          placeholder={placeholder}
        />
        {!!text &&
          <DeleteButton onClick={this.handleClear}>✕</DeleteButton> // TODO: use an actual svg asset?
        }
        <Underline active={showSuggestions} />
        {showSuggestions &&
          <PositionedSuggestions
            activeIndex={this.state.activeIndex}
            places={places}
            onSelect={this.handleSuggestionSelect}
          />}
      </Field>
    );
  }
}
