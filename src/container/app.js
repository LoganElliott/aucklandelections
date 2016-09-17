import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Header from '../components/header/header';
import AddressSearcher from '../components/addresSearcher/AddressSearcher';
import CandidateCards from '../components/candidateCards/candidateCards';
import WhatWeAsked from '../components/WhatWeAsked/WhatWeAsked';
import Footer from '../components/footer/footer';

require('./app.scss');

const muiTheme = getMuiTheme({
    fontFamily: 'P22-underground, sans-serif',
});

export default class App extends Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            ward: ''
        };
        this.setWard = this.setWard.bind(this);
    }

    setWard(ward){
        console.log(ward);
        this.setState({ward:ward});
    }

  render() {
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <div>
                <Header/>
                <div className="header-buffer"></div>
                <AddressSearcher setWard={this.setWard}/>
                <CandidateCards ward={this.state.ward}/>
                <WhatWeAsked/>
                <div style={{height: '160px',marginTop: '100px'}}></div>
                <Footer/>
            </div>
        </MuiThemeProvider>
    );
  }
}
