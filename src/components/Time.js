import React from 'react';
import Checkbox from './Checkbox';
const Time = ({ props }) => {
  const { data, index, selected, onSelect, isSelectedAll, text, eventId } = props;
  const count = index + 1;
  let isChecked =
    (selected &&
      Object.keys(selected).length > 0 &&
      selected[eventId] &&
      selected[eventId][data.id]) ||
    isSelectedAll;
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
      eventId={eventId}
    />
  );
};

export default Time;
