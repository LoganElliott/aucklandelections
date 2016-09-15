import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AddressSearcher from '../components/addresSearcher/AddressSearcher';
import Cards from '../components/cards/cards';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

require('./app.scss');

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
                <div className="headerBuffer"></div>
                <AddressSearcher setWard={this.setWard}/>
                <Cards ward={this.state.ward}/>
                <div className="what-we-asked-container">
                    <div className="what-we-asked">
                        WHAT WE ASKED
                    </div>
                    <div className="what-we-asked-text">
                        <div> We asked every council candidate the same 14 questions on Transport, Housing and the Environment. We gave them points based on how well they answered and how well they matched Generation Zero's vision for a liveable low-carbon Auckland.</div>
                    </div>
                </div>
                <div style={{height: '160px',marginTop: '100px'}}></div>
                <Footer/>
            </div>
        </MuiThemeProvider>
    );
  }
}
