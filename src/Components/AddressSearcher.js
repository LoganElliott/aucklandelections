import React, {PropTypes} from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import axios from 'axios';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

require('./AddressSearcher.scss');

const koordinatesLayerId = 1513;
const koordinatesApiKey = '979e84540aac481685f1e9ea5331cc35';
const googleApiKey = 'AIzaSyAE7vD-Xl1RjQ_PPzinv2omvZy1HqiHI3c';

export default class AddressSearcher extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            localBoard: "",
            value: "",
            searching: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value,
        });
    };

    handleClick() {
        this.getLatLngFromAddress(this.state.value);
    }

    handleEnter(event) {
        if(event.keyCode == 13){
            this.getLatLngFromAddress(this.state.value);
        }
    }

    getLatLngFromAddress(address){
        this.setState({searching: true});
        axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + googleApiKey)
            .then((response) => {
                let lat = response.data.results[0].geometry.location.lat;
                let lng = response.data.results[0].geometry.location.lng;

                this.getLocalBoardFromLatLng(lat,lng);
            })
            .catch((err) => {
                console.debug(err)
            });
    }

    getLocalBoardFromLatLng(lat, lng){
        axios.get('http://api.koordinates.com/api/vectorQuery.json/?key=' + koordinatesApiKey + '&layer=' + koordinatesLayerId + '&x=' + lng + '&y=' + lat)
            .then((koordinatesResponse) => {
                let localBoard = koordinatesResponse.data.vectorQuery.layers[koordinatesLayerId].features[0].properties.CB_NAME;
                if(localBoard === 'Te Irirangi Local Board Area'){
                    localBoard = 'Howick Local Board Area';
                }
                this.setState({localBoard: localBoard});
                this.setState({searching: false})

            })
            .catch((err) => {
                console.debug(err);
                this.setState({searching: false});

            });
    }

    render() {

        const textFieldStyle = {
            margin: 12
        };

        const buttonStyle = {
            margin: 12
        };



        return(
            <div>
                <div id="local-board-input-and-button">
                    <TextField hintText="Enter Address"
                               value={this.state.value}
                               onChange={this.handleChange}
                               style={textFieldStyle}
                               onKeyDown={this.handleEnter}
                    />
                    <RaisedButton label="Find Local Board"
                                  onClick={this.handleClick}
                                  style={buttonStyle}
                    />
                    <div id="loading-bar">
                        { this.state.searching ? <CircularProgress mode="indeterminate" /> : null }
                    </div>
                    { !this.state.searching && this.state.localBoard?  <div>Your Local Board is: {this.state.localBoard}</div> : null }
                </div>
            </div>
        );
    }

}



export default AddressSearcher;
