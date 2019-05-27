import * as React from 'react';

import { Select, SelectProps } from './Select'
import { Place, groupByCity } from '../models/place';

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
    this.setState({
      loading: false,
      places: groupByCity(places),
      showSuggestions: places.length > 0,
    });
  }

  handleLoadSuggestionsFailure = (err) => {
    console.error('failed to load suggestions', err);
    this.setState({ loading: false });
  }

  loadSuggestions = () => {
    const query = this.state.text;
    if (!query) {
      return;
    }
    this.setState({ loading: true })
    fetch(`https://places-dev.cteleport.com/airports?q=${query}&n=10`).
      then(resp => resp.json()).
      then(this.handleLoadSuggestionsSuccess).
      catch(this.handleLoadSuggestionsFailure)
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
