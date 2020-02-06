import React from 'react';
import Checkbox from './Checkbox';
const Time = ({ props }) => {
  const { data, index, selected, onSelect, isSelectedAll, text } = props;
  const count = index + 1;
  let isChecked = isSelectedAll || selected[data.id] != undefined;
  console.log(typeof onSelect);
  return (
    <Checkbox
      id={data.id}
      count={count}
      startTime={data.startTime}
      endTime={data.endTime}
      index={index}
      onSelect={onSelect}
      checked={isChecked}
      text={text}
    />
  );
};

export default Time;
