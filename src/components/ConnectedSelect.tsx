import * as React from 'react';

import { Select, SelectProps } from './Select';
import { Place, groupByCity } from '../models/place';

interface State {
  loading: boolean;
  places: Place[];
  showSuggestions: boolean;
  text: string;
}

export class ConnectedSelect extends React.Component<SelectProps, State> {
  public state: State = {
    loading: false,
    places: [],
    showSuggestions: false,
    text: this.props.defaultValue || '',
  };

  private handleLoadSuggestionsSuccess = (places: Place[]) => {
    this.setState({
      loading: false,
      places: groupByCity(places),
      showSuggestions: places.length > 0,
    });
  };

  private handleLoadSuggestionsFailure = err => {
    console.error('failed to load suggestions', err);
    this.setState({ loading: false });
  };

  private loadSuggestions = () => {
    const query = this.state.text;
    if (!query) {
      return;
    }
    this.setState({ loading: true });
    fetch(`https://places-dev.cteleport.com/airports?q=${query}&n=10`)
      .then(resp => resp.json())
      .then(this.handleLoadSuggestionsSuccess)
      .catch(this.handleLoadSuggestionsFailure);
  };

  private handleTextChange = (text: string) => {
    this.setState({ text });
  };

  private handleSuggestionsCancel = () => {
    this.setState({ showSuggestions: false });
  };

  public render() {
    const {
      defaultValue, // eslint-disable-line @typescript-eslint/no-unused-vars
      ...props
    } = this.props;
    const {
      loading, // eslint-disable-line @typescript-eslint/no-unused-vars
      ...state
    } = this.state;
    return (
      <Select
        onSuggestionsCancel={this.handleSuggestionsCancel}
        onSuggestionsLoad={this.loadSuggestions}
        onTextChange={this.handleTextChange}
        showSuggestions={this.state.showSuggestions}
        {...props}
        {...state}
      />
    );
  }
}
