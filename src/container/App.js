import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AddressSearcher from '../components/AddressSearcher';

export default class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
          <AddressSearcher/>
        </MuiThemeProvider>
    );
  }
}
