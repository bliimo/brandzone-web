import React, { Component } from 'react';
import Text from './Text';
import Time from './Time';

const Schedules = ({ parent, schedules }) => {
  let timeSlots = [];
  if (schedules) {
    schedules.map((e, i) => {
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
        isSelectedAll: parent.state.isSelectedAll
      };
      timeSlots.push(<Time key={i} props={props} />);
    });
  }
  return timeSlots;
};
class EventTimeSlot extends Component {
  state = {
    selected: {},
    isSelectedAll: false,
    isMounted: false
  };

  OnHandleSelect = event => {
    let { selected, isSelectedAll } = this.state;
    const { OnHandleGetTimeSlots, schedules } = this.props;

    if (selected[event.target.getAttribute('id')] === undefined) {
      selected[event.target.getAttribute('id')] = {
        startTime: event.target.getAttribute('starttime'),
        endtime: event.target.getAttribute('endtime')
      };
    } else {
      delete selected[event.target.getAttribute('id')];
    }
    isSelectedAll = Object.keys(schedules).length == Object.keys(selected).length;

    this.setState({ selected, isSelectedAll });
    OnHandleGetTimeSlots(this.OnHandleGetSelected());
  };

  OnHandleGetSelected = () => this.state.selected;

  componentWillReceiveProps(prevProps) {
    let { OnHandleGetTimeSlots, schedules } = this.props;
    if (prevProps.schedules != schedules) this.OnHandleResetSelected();

    this.setState({ OnHandleGetTimeSlots });
  }

  OnHandleResetSelected = () => {
    let { isSelectedAll, selected } = this.state;
    for (const prop of Object.getOwnPropertyNames(selected)) {
      delete selected[prop];
    }
    isSelectedAll = false;
    this.setState({ isSelectedAll, selected });
  };

  OnHandleSelectAll = () => {
    let { isSelectedAll, selected } = this.state;
    let { schedules } = this.props;
    const { OnHandleGetTimeSlots } = this.props;

    isSelectedAll = !isSelectedAll;

    if (isSelectedAll) {
      schedules.map(e => {
        if (selected[e.id] == undefined)
          selected[e.id] = { startTime: e.startTime, endTime: e.endTime };
      });
    } else {
      for (const prop of Object.getOwnPropertyNames(selected)) {
        delete selected[prop];
      }
    }

    this.setState({ isSelectedAll, selected });
    OnHandleGetTimeSlots(this.OnHandleGetSelected());
  };

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  render() {
    const { schedules } = this.props;
    return (
      <div style={style.main}>
        <div className='text-center mt-4'>
          <Text style={style.text}>
            <span style={style.selectTimeSlot}> Select Time Slots</span>
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
    letterSpacing: 0.5
  }
};

export default EventTimeSlot;
