import React from 'react';

import palette from '../constants/colors';

const RequestInfoActionButton = () => {
  return (
    <div style={{textAlign: 'right'}}>
      <button
        style={{
          color: 'white',
          backgroundColor: palette.lime,
          borderRadius: 3,
          fontSize: 12,
          fontWeight: 'bold',
          height: 30,
          width: 120,
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
          fontSize: 12,
          fontWeight: 'bold',
          height: 30,
          width: 120,
          marginLeft: 5,
        }}
        type="button"
      >
        Reject
      </button>
    </div>
  );
};

export default RequestInfoActionButton;
