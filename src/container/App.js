import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AddressSearcher from '../components/addresSearcher/AddressSearcher';
import CouncillorCard from '../components/councillorCards/councillorCard';

export default class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
            <div>
                <AddressSearcher/>
                <CouncillorCard/>
            </div>
        </MuiThemeProvider>
    );
  }
}
