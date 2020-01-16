import React, { Component } from 'react';
import Text from './Text';
import Time from './Time';

const Schedules = ({ parent }) => {
  let timeSlots = [];
  parent.state.scheds.map((e, i) => {
    const props = {
      text: `${e.startTime} - ${e.endTime}`,
      data: e,
      index: i,
      selected: parent.state.selected,
      onSelect: parent.OnHandleSelect,
      isSelectedAll: parent.state.isSelectedAll
    };
    timeSlots.push(<Time key={i} props={props} />);
  });
  return timeSlots;
};

class EventTimeSlot extends Component {
  state = {
    scheds: [
      {
        id: 1,
        startTime: '2:30',
        endTime: '2:50'
      },
      {
        id: 2,
        startTime: '2:30',
        endTime: '2:50'
      },
      {
        id: 3,
        startTime: '2:30',
        endTime: '2:50'
      },
      {
        id: 4,
        startTime: '2:30',
        endTime: '2:50'
      },
      {
        id: 5,
        startTime: '2:30',
        endTime: '2:50'
      },
      {
        id: 6,
        startTime: '2:30',
        endTime: '2:50'
      },
      {
        id: 7,
        startTime: '2:30',
        endTime: '2:50'
      },
      {
        id: 8,
        startTime: '2:30',
        endTime: '2:50'
      },
      {
        id: 9,
        startTime: '2:30',
        endTime: '2:50'
      },
      {
        id: 10,
        startTime: '2:30',
        endTime: '2:50'
      },
      {
        id: 11,
        startTime: '2:30',
        endTime: '2:50'
      },
      {
        id: 12,
        startTime: '2:30',
        endTime: '2:50'
      }
    ],
    selected: {},
    isSelectedAll: false
  };

  OnHandleSelect = event => {
    const { selected } = this.state;
    const { OnHandleGetTimeSlots } = this.props;

    if (selected[event.target.getAttribute('id')] === undefined) {
      selected[event.target.getAttribute('id')] = true;
    } else {
      delete selected[event.target.getAttribute('id')];
    }

    this.setState({ selected, isSelectedAll: false });
    OnHandleGetTimeSlots(this.OnHandleGetSelected());
  };

  OnHandleGetSelected = () => this.state.selected;

  componentWillMount() {
    const { OnHandleGetTimeSlots } = this.props;
    this.setState({ OnHandleGetTimeSlots });
  }

  OnHandleSelectAll = () => {
    let { isSelectedAll, scheds, selected } = this.state;
    const { OnHandleGetTimeSlots } = this.props;

    isSelectedAll = !isSelectedAll;

    if (isSelectedAll) {
      scheds.map(e => {
        if (selected[e.id] == undefined) selected[e.id] = true;
      });
    } else {
      for (const prop of Object.getOwnPropertyNames(selected)) {
        delete selected[prop];
      }
    }

    this.setState({ isSelectedAll, selected });
    OnHandleGetTimeSlots(this.OnHandleGetSelected());
  };

  render() {
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
        <Schedules parent={this} />
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
