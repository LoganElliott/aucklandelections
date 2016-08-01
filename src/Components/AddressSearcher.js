import React, {PropTypes} from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const AddressSearcher = ({onSearchClick}) => (
    <div>
        <TextField hintText="Enter Address"/>
        <RaisedButton label="Find Ward"
                      onClick={onSearchClick}
        />
    </div>
);

AddressSearcher.propTypes = {
    onSearchClick: PropTypes.func.isRequired
};

export default AddressSearcher;
