import React from 'react';

import { MDBInput } from 'mdbreact';

const TextInput = ({id, placeholder, label, value, onChange, size, style, type, required, autocomplete, className, rows}) =>{
    return (
        <MDBInput outline className={className} id={id} placeHolder={placeholder} label={label} value={value} onChange={onChange} size={size} style={style} type={type} required={required} autoComplete={autocomplete} rows={rows} />
    )
}

export default TextInput;