import * as React from 'react';

import { Select, SelectProps } from './Select'
import { Place, groupByCity } from '../models/place';

const testPlaces = require('../../test/test_response_2.json'); // FIXME: inline json

interface Props extends SelectProps { }

interface State {
  loading: boolean;
  places: Place[],
  showSuggestions: boolean;
  text: string;
}

export class ConnectedSelect extends React.Component<Props, State> {

  state: State = {
    loading: false,
    places: [],
    showSuggestions: false,
    text: this.props.defaultValue || '',
  }

  handleLoadSuggestionsSuccess = (places: Place[]) => {
    console.log('handleLoadSuggestionsSuccess');
    this.setState({
      loading: false,
      places,
      showSuggestions: true,
    });
  }

  handleLoadSuggestionsFailure = (err) => {
    console.error('failed to load suggestions', err);
    this.setState({ loading: false });
  }

  loadSuggestions = () => {
    const places = groupByCity(testPlaces); // TODO: an actual request
    this.setState({ loading: true });
    setTimeout(() => this.handleLoadSuggestionsSuccess(places), 1000);
  }

  handleTextChange = (text: string) => {
    this.setState({ text });
  }

  handleSuggestionsCancel = () => {
    this.setState({ showSuggestions: false });
  }

  render() {
    const { defaultValue, ...props } = this.props;
    const { loading, ...state } = this.state;
    return (
      <Select
        onSuggestionsCancel={this.handleSuggestionsCancel}
        onSuggestionsLoad={this.loadSuggestions}
        onTextChange={this.handleTextChange}
        showSuggestions={this.state.showSuggestions}
        {...props}
        {...state}
      />
    )
  }
}
