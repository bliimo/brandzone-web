import React, { Component } from 'react';
import Text from './Text';
import Time from './Time';

const Schedules = ({ parent, schedules }) => {
  let timeSlots = [];
  if (schedules && schedules.scheds) {
    schedules.scheds.map((e, i) => {
      let startTime = e.startTime.substring(0, e.startTime.length - 3);
      let endTime = e.endTime.substring(0, e.endTime.length - 3);
      startTime = startTime.substring(0, 1) == '0' ? startTime.substring(1) : startTime;
      endTime = endTime.substring(0, 1) == '0' ? endTime.substring(1) : endTime;
      const props = {
        text: `${startTime} - ${endTime}`,
        data: e,
        index: i,
        selected: parent.state.selected,
        onSelect: parent.OnHandleSelect,
        isSelectedAll: parent.state.isSelectedAll,
        eventId: schedules.eventId
      };
      timeSlots.push(<Time key={i} props={props} />);
    });
  }
  return timeSlots;
};
class EventTimeSlot extends Component {
  state = {
    isSelectedAll: false,
    isMounted: false,
    selected: {}
  };

  OnHandleSelect = event => {
    let { selectedSchedules, isSelectedAll } = this.props;
    const { OnHandleGetTimeSlots, schedules, parent } = this.props;
    const eventId = event.target.getAttribute('eventid');
    const id = event.target.getAttribute('id');
    if (selectedSchedules[eventId] !== undefined) {
      if (selectedSchedules[eventId][id] === undefined) {
        selectedSchedules[eventId][id] = {
          startTime: event.target.getAttribute('starttime'),
          endtime: event.target.getAttribute('endtime')
        };
      } else if (selectedSchedules[eventId][id] != undefined) {
        delete selectedSchedules[eventId][id];
      }
    } else if (selectedSchedules[eventId] == undefined) {
      selectedSchedules[eventId] = {
        [id]: {
          startTime: event.target.getAttribute('starttime'),
          endtime: event.target.getAttribute('endtime')
        }
      };
    }
    parent.setState({ selectedSchedules });
    isSelectedAll =
      Object.keys(schedules.scheds).length == Object.keys(selectedSchedules[eventId]).length;
    this.setState({ selected: selectedSchedules, isSelectedAll });
    OnHandleGetTimeSlots(this.OnHandleGetSelected());
  };

  OnHandleGetSelected = () => this.state.selected;

  componentWillReceiveProps(nextProps, prevProps) {
    let { OnHandleGetTimeSlots, schedules, selectedSchedules } = nextProps;
    if (Object.keys(selectedSchedules).length == 0) this.OnHandleResetSelected();
    this.setState({ OnHandleGetTimeSlots, selected: selectedSchedules });
  }

  OnHandleResetSelected = () => {
    let { isSelectedAll, selected } = this.state;
    let { schedules } = this.props;
    for (const prop of Object.getOwnPropertyNames(selected)) {
      delete selected[schedules.eventId];
    }
    isSelectedAll = false;
    this.setState({ isSelectedAll, selected });
  };

  OnHandleSelectAll = () => {
    let { isSelectedAll, selected } = this.state;
    let { schedules, parent } = this.props;
    const { OnHandleGetTimeSlots } = this.props;

    isSelectedAll = !isSelectedAll;

    if (isSelectedAll) {
      schedules.scheds.map(e => {
        if (!selected[schedules.eventId]) {
          selected[schedules.eventId] = {
            [e.id]: { startTime: e.startTime, endTime: e.endTime }
          };
        } else {
          selected[schedules.eventId][e.id] = {
            startTime: e.startTime,
            endTime: e.endTime
          };
        }
      });
    } else if (selected[schedules.eventId]) {
      delete selected[schedules.eventId];
    }

    parent.setState({ selected });
    this.setState({ isSelectedAll, selected: selected });
    OnHandleGetTimeSlots(this.OnHandleGetSelected());
  };

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  render() {
    const { schedules, title } = this.props;
    return (
      <div style={style.main}>
        <div className='text-center mt-1'>
          <Text style={style.text}>
            <span style={style.selectTimeSlot}> {title}</span>
            <span
              style={style.selectAll}
              onClick={this.OnHandleSelectAll}
              className='cursor-pointer float-right'
            >
              Select All
            </span>
          </Text>
        </div>
        <Schedules parent={this} schedules={schedules} />
      </div>
    );
  }
}

const style = {
  main: {},
  selectAll: {
    color: '#8ec63f',
    letterSpacing: 0.5,
    font: 'bold 11px Helvetica'
  },
  selectTimeSlot: {
    position: 'relative',
    left: '2em'
  },
  text: {
    color: '#fff',
    font: 'bold 11px Helvetica',
    letterSpacing: 0.5,
    marginBottom: '1em'
  }
};

export default EventTimeSlot;
