import React from 'react';

import palette from '../constants/colors';

const RequestActionButton = () => {
  return (
    <div style={{ display: 'flex' }}>
      <button
        type="button"
        style={{
          display: 'flex',
          border: '1px solid lightgray',
          borderRadius: 3,
          fontSize: 7,
          fontWeight: 'bold',
          height: 23,
          width: 80,
          justifyContent: 'center',
        }}
      >
        View Portfolio
      </button>
      <div
        style={{
          borderRight: '1px solid whitesmoke',
          marginLeft: 5,
        }}
      />
      <button
        style={{
          color: 'white',
          backgroundColor: palette.lime,
          borderRadius: 3,
          fontSize: 7,
          fontWeight: 'bold',
          height: 23,
          width: 50,
          marginLeft: 5,
        }}
        type="button"
      >
        Verify
      </button>
      <button
        style={{
          color: 'white',
          backgroundColor: palette.crimson,
          borderRadius: 3,
          fontSize: 7,
          fontWeight: 'bold',
          height: 23,
          width: 50,
          marginLeft: 5,
        }}
        type="button"
      >
        Reject
      </button>
    </div>
  );
};

export default RequestActionButton;
