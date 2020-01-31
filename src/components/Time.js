import React from 'react';

const Time = ({ props }) => {
  const { data, index, selected, onSelect, isSelectedAll, text } = props;
  const count = index + 1;
  let isChecked = isSelectedAll || selected[data.id] != undefined;

  return (
    <div style={style.slots} className={`time-slots ${count % 3 == 0 ? 'mr-0' : ''}`}>
      <input
        className='styled-checkbox'
        id={data['id']}
        starttime={data['startTime']}
        endtime={data['endTime']}
        type='checkbox'
        index={index}
        onChange={onSelect}
        checked={isChecked}
      />
      <label className='checkbox-label' htmlFor={data['id']} />
      <label className='checkbox-text' htmlFor={data['id']}>
        {text}
      </label>
    </div>
  );
};

export default Time;

const style = {
  slots: {
    position: 'relative',
    top: '.1em',
    marginBottom: '1em',
    display: 'inline-block'
  },
  text: {
    color: '#fff',
    font: 'bold 11px Helvetica',
    letterSpacing: 0.5
  }
};
