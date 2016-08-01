import { connect } from 'react-redux'
import { getLatLong } from '../actions/asyncActions'
import AddressSearcher from '../components/AddressSearcher'

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchClick: () => {
            dispatch(getLatLong())
        }
    }
}

const AddressSearcherContainer = connect(null, mapDispatchToProps)(AddressSearcher)

export default AddressSearcherContainer