import React from 'react';

const Checkbox = ({ count, id, startTime, endTime, index, onSelect, checked, text, className }) => {
  return (
    <div style={style.slots} className={`time-slots ${className} ${count % 3 == 0 ? 'mr-0' : ''}`}>
      <input
        className='styled-checkbox'
        id={id}
        starttime={startTime}
        endtime={endTime}
        type='checkbox'
        index={index}
        onChange={onSelect}
        checked={checked}
      />
      <label className='checkbox-label' htmlFor={id} />
      <label className='checkbox-text' htmlFor={id}>
        {text}
      </label>
    </div>
  );
};

const style = {
  slots: {
    position: 'relative',
    top: '.1em',
    marginBottom: '1em',
    display: 'inline-block'
  }
};

export default Checkbox;
