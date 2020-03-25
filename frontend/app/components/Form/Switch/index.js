import React from 'react'
import {useIntl} from 'react-intl'
import PropTypes from 'prop-types';
import { AppSwitch } from '@coreui/react'

const Switch = (props) => {
    const {field, label, data, handleChange} = props
    const intl = useIntl()
    
    const onChange = (e) => {
        const value = e.target.checked ? e.target.value : e.target.checked
        handleChange(value)
    }

    return (

        <AppSwitch className="mx-1" color="success"
            checked={data ? Boolean(data) : false}
            name={field.name}
            value={data  ? data : field.value ? field.value : true}
            onChange={(e) => onChange(e)}
            required={field.required ? field.required : false}
        />
    )
}

Switch.propTypes = {
    handleChange: PropTypes.func.isRequired,
    field: PropTypes.object.isRequired,
};

export default Switch