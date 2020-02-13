import React from 'react';

import { MDBInput } from 'mdbreact';

const TextInput = ({
  id,
  placeHolder,
  label,
  value,
  onChange,
  size,
  style,
  type,
  required,
  autocomplete,
  className,
  rows,
  disabled,
  max,
  maxLength
}) => {
  return (
    <MDBInput
      disabled={disabled}
      outline
      className={className}
      id={id}
      placeHolder={placeHolder}
      label={label}
      value={value}
      onChange={onChange}
      size={size}
      style={style}
      type={type}
      required={required}
      autoComplete={autocomplete}
      rows={rows}
      maxLength={maxLength}
    />
  );
};

export default TextInput;
