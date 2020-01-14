import React from 'react';
import 'react-icons/io';
import { FaSort } from 'react-icons/fa';

const ClickableColumnHeader = ({ text, width }) => {
  return (
    <button
      type="button"
      style={{
        display: 'flex',
        alignItems: 'center',
        minWidth: width,
        marginRight: 5,
        paddingLeft: 0,
      }}
    >
      <FaSort size={11} />
      <h4 style={{ marginLeft: 3 }}>{text}</h4>
    </button>
  );
};

export default ClickableColumnHeader;
