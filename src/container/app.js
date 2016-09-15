import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AddressSearcher from '../components/addresSearcher/AddressSearcher';
import Cards from '../components/cards/cards';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

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
        <MuiThemeProvider>
            <div>
                <Header/>
                <div style={{height: '83px'}}></div>
                <AddressSearcher setWard={this.setWard}/>
                <Cards ward={this.state.ward}/>
                <div style={{height: '83px',marginTop: '100px'}}></div>
                <Footer/>
            </div>
        </MuiThemeProvider>
    );
  }
}
