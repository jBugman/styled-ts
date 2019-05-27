import * as React from 'react';
import styled from 'styled-components';
import { debounce } from 'debounce';

import { Suggestions, SuggestionsProps } from './Suggestions';
import { groupByCity, placeDescription } from '../models/place';

const testPlaces = require('../../test/test_response_2.json'); // FIXME: inline json

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

interface State extends SuggestionsProps {
  showSuggestions: boolean;
  text: string;
}

export class Select extends React.Component<SelectProps, State> {

  state: State = {
    activeIndex: 0,
    places: [],
    showSuggestions: false,
    text: this.props.defaultValue || '',
  }

  showSuggestions = () => {
    console.log('showing suggestions');  // FIXME: console
    this.setState({
      activeIndex: 0,
      places: groupByCity(testPlaces),
      showSuggestions: true,
    });
  }

  loadSuggestions = debounce(this.showSuggestions, SUGGESTIONS_DELAY)

  onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value || '';
    e.preventDefault();
    console.log('text changed to:', text); // FIXME: console
    if (text.length >= MIN_SYMBOLS_CUTOFF) {
      this.setState({ text });
      this.loadSuggestions();
    } else {
      this.setState({ text, showSuggestions: false });
      this.loadSuggestions.clear();
    }
  }

  handleSuggestionSelect = (text: string) => {
    this.setState({ text, showSuggestions: false });
  }

  handleClear = () => {
    this.handleSuggestionSelect('');
  }

  handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!this.state.showSuggestions) {
      return;
    }
    var idx = this.state.activeIndex;
    // up
    if (e.keyCode === 38) {
      idx = Math.max(0, idx - 1);
      this.setState({ activeIndex: idx });
    }
    // down
    if (e.keyCode === 40) {
      idx = Math.min(Math.max(this.state.places.length - 1, 0), idx + 1);
      this.setState({ activeIndex: idx });
    }
    // enter
    if (e.keyCode === 13) {
      // It should actually react to space, but for now it complicates things too much
      if (this.state.places.length === 0) {
        return;
      }
      const selectedPlace = this.state.places[this.state.activeIndex];
      const text = placeDescription(selectedPlace);
      this.handleSuggestionSelect(text);
    }
    // esc
    if (e.keyCode === 27) {
      this.setState({ showSuggestions: false });
    }
    console.log('keypress', e.key, e.keyCode);  // FIXME: console
  }

  render() {
    const {
      label,
      placeholder
    } = this.props;

    const showDeleteButton = !!this.state.text;

    return (
      <Field>
        <Label>{label}</Label>
        <Input
          type="text"
          value={this.state.text}
          onChange={this.onTextChange}
          onKeyDown={this.handleKeyPress}
          placeholder={placeholder}
        />
        {showDeleteButton &&
          <DeleteButton onClick={this.handleClear}>✕</DeleteButton> // TODO: use an actual svg asset?
        }
        <Underline active={this.state.showSuggestions} />
        {this.state.showSuggestions &&
          <PositionedSuggestions
            activeIndex={this.state.activeIndex}
            places={this.state.places}
            onSelect={this.handleSuggestionSelect}
          />}
      </Field>
    );
  }
}
