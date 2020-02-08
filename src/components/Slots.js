import React from 'react';
import EventTimeSlot from './EventTimeSlot';

const Slots = ({ parent, schedules, title }) => {
  return (
    <div>
      <EventTimeSlot
        OnHandleGetTimeSlots={parent.OnHandleGetTimeSlots}
        isReset={parent.state.isReset}
        schedules={schedules}
        onResetSelected={parent.OnHandleResetSelected}
        parent={parent}
        selectedSchedules={parent.state.selectedSchedules}
        title={title}
      />
    </div>
  );
};

export default Slots;
