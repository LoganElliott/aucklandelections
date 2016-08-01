import axios from 'axios';

export const BEGIN_SEARCH_ADDRESS = 'BEGIN_SEARCH_ADDRESS';
export const FETCH_LAT_LONG_ERROR = 'FETCH_LAT_LONG_ERROR';
export const RECEIVE_LAT_LONG = 'RECEIVE_LAT_LONG';

export function beginGetLatLong() {
    return {
        type: BEGIN_SEARCH_ADDRESS
    }
}

export function receiveLatLong(json) {
    return {
        type: RECEIVE_LAT_LONG,
        payload: json
    }
}

export function fetchLatLongError(err) {
    return {
        type: FETCH_LAT_LONG_ERROR,
        payload: err
    }
}

export function getLatLong(address) {
    return (dispatch) => {

        dispatch(beginGetLatLong());
        axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=29+leighton+st,+grey+lynn,+Auckland&key=AIzaSyAE7vD-Xl1RjQ_PPzinv2omvZy1HqiHI3c')
            .then((response) => {
                dispatch(receiveLatLong(response.data))
            })
            .catch((err) => {
                dispatch(fetchLatLongError(err))
            })
    }
}
