import React from 'react';

import palette from '../constants/colors';

const RoundedButton = ({ title, onClick, buttonType }) => {
  return (
    <button
      onClick={onClick}
      type={buttonType}
      style={{
        display: 'flex',
        height: '35px',
        width: '100%',
        backgroundColor: palette.tomato,
        justifyContent: 'center',
        borderRadius: 4,
      }}
    >
      <p
        style={{
          color: '#fff',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          marginTop: 8,
          marginBottom: 8,
        }}
      >
        {title}
      </p>
    </button>
  );
};

export default RoundedButton;
