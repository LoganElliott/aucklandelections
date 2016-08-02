

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

    }
}
