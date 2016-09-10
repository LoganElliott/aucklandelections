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
        axios.get('https://maps.googleapis.com/maps/api/geocode/json?region=NZ&address=' + address + '&key=' + googleApiKey)
            .then((response) => {
                let lat = response.data.results[0].geometry.location.lat;
                let lng = response.data.results[0].geometry.location.lng;

                this.getLocalBoardFromLatLng(lat,lng);
            })
            .catch((err) => {
                this.setState({searching: false});
                this.props.setLocalBoard('');
                this.setState({localBoard: ''});
                console.debug(err)
            });
    }

    getLocalBoardFromLatLng(lat, lng){
        axios.get('https://api.koordinates.com/api/vectorQuery.json/?key=' + koordinatesApiKey + '&layer=' + koordinatesLayerId + '&x=' + lng + '&y=' + lat)
            .then((koordinatesResponse) => {
                let localBoard = koordinatesResponse.data.vectorQuery.layers[koordinatesLayerId].features[0].properties.CB_NAME;
                if(localBoard === 'Te Irirangi Local Board Area'){
                    localBoard = 'Howick Local Board Area';
                }
                localBoard = localBoard.replace(' Local Board Area', '');
                this.setState({localBoard: localBoard});
                this.setState({searching: false});
                this.props.setLocalBoard(localBoard);

            })
            .catch((err) => {
                console.debug(err);
                this.setState({searching: false});
                this.props.setLocalBoard('');
            });
    }

    render() {

        const textFieldStyle = {
            margin: 12
        };

        const buttonStyle = {
            margin: 12
        };

        const genZeroStyle = {
            fontWeight: 900
        };

        const localElectionScoreCards = {
            fontSize: '50px'
        };

        const aboutText = {
            fontSize: '18px',
            fontWeight: 300,
        };

        let infoText;
        if(!this.state.localBoard){
            infoText = <div>
                <div style={genZeroStyle}>
                    GENERATION ZERO'S
                </div>
                <div style={localElectionScoreCards}>
                    Local Election Scorecards
                </div>
                <div style={aboutText}>
                    We sat down and grilled each Auckland Council candidate one by one.
                    <br/>
                    Here are their results.
                </div>
            </div>
        } else {
            infoText = '';
        }

        return(
            <div>
                <div id="local-board-input-and-button" className={!this.state.localBoard ? 'centre-textField' : ''}>

                    {infoText}
                    <div className={this.state.localBoard ? 'field-button-container' : ''}>
                        <div>
                            <TextField hintText="Enter Address"
                                       value={this.state.value}
                                       onChange={this.handleChange}
                                       style={textFieldStyle}
                                       onKeyDown={this.handleEnter}
                            />
                        </div>
                        <div>
                            <RaisedButton label="FIND MY VOTING AREA"
                                          onClick={this.handleClick}
                                          style={buttonStyle}
                                          className='find-my-voting-area-button'
                            />
                        </div>
                    </div>
                    <div id="loading-bar">
                        { this.state.searching ? <CircularProgress mode="indeterminate"/> : null }
                    </div>
                    { !this.state.searching && this.state.localBoard?  <div>Your Local Board is: {this.state.localBoard}</div> : null }
                </div>
            </div>
        );
    }

}
