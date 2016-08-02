import React, {PropTypes} from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

export default class AddressSearcher extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            ward: "",
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=29+leighton+st,+grey+lynn,+Auckland&key=AIzaSyAE7vD-Xl1RjQ_PPzinv2omvZy1HqiHI3c')
            .then((response) => {
                console.debug(response.data);
                let lat = response.data.results[0].geometry.location.lat;
                let lng = response.data.results[0].geometry.location.lng;
                axios.get("http://api.koordinates.com/api/vectorQuery.json/?key=979e84540aac481685f1e9ea5331cc35&layer=1349&x=" + lng + "&y=" + lat)
                    .then((koordinatesResponse) => {
                        console.debug(koordinatesResponse.data);

                        this.setState({ward: koordinatesResponse.data.vectorQuery.layers[1349].features[0].properties.WARD_NAME});
                    })
                    .catch((err) => {
                        console.debug(err)
                    });
            })
            .catch((err) => {
                console.debug(err)
            });


    }



    render() {

        return(
            <div>
                <TextField hintText="Enter Address"/>
                <RaisedButton label="Find Ward"
                              onClick={this.handleClick}
                />
                {this.state.ward}
            </div>
        );
    }

}



export default AddressSearcher;
