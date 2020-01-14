import React from 'react';
import { IoIosSearch } from 'react-icons/io';

const RoundedSearchBar = () => {
  return (
    <div
      style={{
        display: 'flex',
        border: '1px solid lightgray',
        height: '25px',
        width: '160px',
        background: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 15,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <input style={{ flex: 1 }} placeholder="Search..." />
      <IoIosSearch />
    </div>
  );
};

export default RoundedSearchBar;
