import React, { Component } from 'react';
import Text from './Text';
import Time from './Time';

const Schedules = ({ parent, scheds }) => {
  let timeSlots = [];
  if (scheds) {
    scheds.map((e, i) => {
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
  }
  return timeSlots;
};
class EventTimeSlot extends Component {
  state = {
    selected: {},
    isSelectedAll: false
  };

  OnHandleSelect = event => {
    let { selected, isSelectedAll } = this.state;
    const { OnHandleGetTimeSlots, scheds } = this.props;

    if (selected[event.target.getAttribute('id')] === undefined) {
      selected[event.target.getAttribute('id')] = true;
    } else {
      delete selected[event.target.getAttribute('id')];
    }
    isSelectedAll = Object.keys(scheds).length == Object.keys(selected).length;

    this.setState({ selected, isSelectedAll });
    OnHandleGetTimeSlots(this.OnHandleGetSelected());
  };

  OnHandleGetSelected = () => this.state.selected;

  componentWillReceiveProps() {
    let { OnHandleGetTimeSlots } = this.props;
    this.setState({ OnHandleGetTimeSlots });
  }

  OnHandleSelectAll = () => {
    let { isSelectedAll, selected } = this.state;
    let { scheds } = this.props;
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
    const { scheds } = this.props;
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
        <Schedules parent={this} scheds={scheds} />
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
