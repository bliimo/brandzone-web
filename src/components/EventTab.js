import React, { Component } from 'react';
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBCollapse } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import Text from '../components/Text';
import Button from './Button';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Link = ({ data, parent, index }) => {
  const { title, address, date } = data;
  return (
    <MDBNavItem>
      <NavLink
        to='#'
        className={`nav-links ${parent.state.activeItem === index ? 'active-tab' : ''}`}
        onClick={parent.OnHandleToggle(index)}
        role='tab'
      >
        <Text style={style.tabTitle}>{title}</Text>
        <hr />
      </NavLink>
    </MDBNavItem>
  );
};

const Tab = ({ data, index }) => {
  const { title, address, date, scheds, id } = data;
  return (
    <MDBTabPane tabId={index} role='tabpanel' className='fade-effect' style={style.pane}>
      <Text className='text-center' style={style.tabTitleHeader}>
        {title}
      </Text>
      <Text className='text-center' style={style.tabTitleSmall}>
        {`${date} - ${address}`}
      </Text>
      <hr style={style.tabTitleHeaderHr} />
    </MDBTabPane>
  );
};

const Tabs = ({ parent }) => {
  const { events } = parent.state;
  let event = [];
  let link = [];
  events.map((e, i) => {
    link.push(<Link data={e} key={i} index={i.toString()} parent={parent} />);
    event.push(<Tab data={e} key={i} index={i.toString()} />);
  });

  return (
    <div>
      <MDBNav tabs className='justify-content-center event-tabs'>
        {link}
      </MDBNav>
      <MDBTabContent className='card' activeItem={parent.state.activeItem} style={style.tabs}>
        {event}
      </MDBTabContent>
      <div style={style.schedules}>
        <Schedules parent={parent} />
      </div>
    </div>
  );
};

const Schedule = ({ data, parent }) => {
  const { id, startTime, endTime } = data;
  return (
    <MDBContainer
      className={`mb-3 text-light fade-effect ${
        id === parent.state.isOpen || parent.state.isOpen === null
          ? 'd-block'
          : 'd-none margin-absolute'
      }`}
    >
      <Button
        style={style.buttonTime}
        className={`btn-animate-time ${parent.state.isOpen === null ? 'inactive' : ''}`}
        onClick={() => parent.OnHandleOpenTime(id)}
      >
        <Text
          className={`btn-animate-text-time ${
            id === parent.state.isOpen ? 'font-weight-bold text-light font-size-15' : ''
          }`}
        >{`${startTime} - ${endTime}`}</Text>
      </Button>
      <MDBContainer
        className={`fade-effect .fade-out-effect mt-3 time-collapse ${
          id === parent.state.isOpen ? 'd-block' : 'd-none'
        }`}
      >
        <Text className='text-center' style={style.participantText}>
          Available Participants:
        </Text>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum
        </p>
      </MDBContainer>
    </MDBContainer>
  );
};

const Schedules = ({ parent }) => {
  let scheds = [];
  parent.state.schedules.map((e, i) => {
    scheds.push(<Schedule key={i} parent={parent} data={e} />);
  });
  return scheds;
};

class EventTab extends Component {
  state = {
    activeItem: '0',
    events: [
      {
        id: 0,
        title: 'Manila',
        date: 'Feb 28',
        address: 'New world Hotel Makati',
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
        ]
      },
      {
        id: 1,
        date: 'Feb 28',
        title: 'Cebu',
        address: 'New world Hotel Makati',
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
          }
        ]
      },
      {
        id: 2,
        date: 'Feb 28',
        title: 'Pangasinan',
        address: 'All',
        scheds: [
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
        ]
      }
    ],
    isOpen: null,
    schedules: []
  };

  OnHandleToggle = tab => () => {
    const { events } = this.state;
    this.setState({ isOpen: null, schedules: events[tab].scheds });
    if (this.state.activeItem !== tab) this.setState({ activeItem: tab });
  };

  componentDidMount() {
    const { events } = this.state;
    this.setState({ isOpen: null, schedules: events[0].scheds });
  }

  OnHandleOpenTime = id => {
    let { isOpen } = this.state;
    isOpen = id != isOpen ? id : null;
    this.setState({ isOpen });
  };

  OnHandleGetTimeSlots = schedules => {
    this.setState({ schedules });
  };
  render() {
    return (
      <MDBContainer style={style.main} id='mainTab'>
        <Tabs parent={this} />
        <ToastContainer />
      </MDBContainer>
    );
  }
}

const style = {
  main: {
    width: '63.7vw'
  },
  tabs: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  white: {
    color: '#fff'
  },
  tabTitleHeader: {
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 6,
    fontSize: '2.3em',
    position: 'relative',
    top: '.5em',
    fontFamily: 'Harabara',
    marginBottom: '1.25em'
  },
  tabTitleHeaderHr: {
    borderBottom: '3.2px solid #8ec63f',
    width: '5.6em',
    position: 'relative',
    bottom: '1.3em',
    margin: 'auto'
  },

  tabTitle: {
    marginTop: 7,
    marginBottom: 1,
    fontFamily: 'Harabara',
    fontSize: 14
  },
  tabTitleSmall: {
    position: 'relative',
    bottom: '.9em',
    fontFamily: 'Harabara',
    fontSize: 14,
    letterSpacing: 2,
    color: '#fff'
  },
  pane: {
    position: 'relative',
    bottom: '.1em'
  },
  buttonTime: {
    border: 'solid 1px #4b5755',
    color: '#b1b1b1',
    backgroundColor: '#4b5755',
    width: '31.5em',
    borderRadius: '5px',
    padding: '.5em',
    textAlign: 'center',
    fontSize: '13.5px',
    fontWeight: 'bolder',
    cursor: 'pointer',
    margin: 'auto',
    position: 'relative',
    top: '1em',
    height: 37
  },
  schedules: {
    position: 'relative',
    top: '.5em'
  },
  participantText: {
    fontSize: 11.5,
    fontFamily: 'Helvetica',
    position: 'relative',
    top: '.8em',
    color: '#fff'
  }
};
export default EventTab;
