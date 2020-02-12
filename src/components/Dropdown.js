import React, { Component } from 'react';
import { MDBContainer, MDBIcon, MDBCollapse } from 'mdbreact';
import Text from '../components/Text';
import { getMonthName } from '../helper/date';

const Active = ({ parent }) => {
  const { active, items, isOpen } = parent.state;
  let index = null;

  if (active != null) {
    index = active;
  }
  let dateArr = [];
  let date = '';
  try {
    if (items[index]['date']) {
      dateArr = items[index]['date'].split('T')[0].split('-');
      date = `${getMonthName(dateArr[1])} ${dateArr[2]}`;
    }
  } catch (error) {}

  return (
    <div className='cursor-pointer' onClick={() => parent.OnHandleOpen()}>
      <Text style={style.active} className={`drop-text ${isOpen ? 'opacity-1' : 'opacity-.5'}`}>
        {index != null
          ? items[index]['name']
            ? items[index]['name']
            : `${items[index]['isAllEvent'] ? '' : date + ' - '}${items[index]['title']}`
          : parent.state.label}
        <MDBIcon
          icon={isOpen ? 'caret-up' : 'caret-down'}
          style={style.caret}
          className='float-right'
        />
      </Text>
    </div>
  );
};

const Items = ({ parent }) => {
  const { items, isOpen } = parent.state;
  let elem = [];
  items.map((e, i) => {
    let isValidRole = false;
    const usertype = parent.props.usertype + 1;
    if (e.roles && usertype) {
      const roles = e.roles.split(',');
      roles.map(r => {
        console.log(r, usertype);
        if (r == usertype) isValidRole = true;
      });
    }
    console.log(isValidRole);
    if (parent.state.isEvent && isValidRole) {
      elem.push(<Item data={e} index={i} key={`${i} ${e.id}`} setActive={parent.OnHandleActive} />);
    } else if (parent.state.isEvent && e.isSingleSelection == true && e.title !== 'All') {
      elem.push(<Item data={e} index={i} key={`${i} ${e.id}`} setActive={parent.OnHandleActive} />);
    } else if (e.title == 'All') {
      elem.push(<Item data={e} index={i} key={`${i} ${e.id}`} setActive={parent.OnHandleActive} />);
    } else if (!parent.state.isEvent) {
      elem.push(<Item data={e} index={i} key={`${i} ${e.id}`} setActive={parent.OnHandleActive} />);
    }
  });
  return (
    <MDBCollapse className='absolute-collapse' style={style.collapse} isOpen={isOpen}>
      <div className='ml-3 mr-3 mb-4 mt-1'>{elem}</div>
    </MDBCollapse>
  );
};

const Item = ({ data, index, setActive }) => {
  let dateArr = [];
  let date = '';
  try {
    if (data['date']) {
      dateArr = data['date'].split('T')[0].split('-');
      date = `${getMonthName(dateArr[1])} ${dateArr[2]}`;
    }
  } catch (error) {}
  return (
    <div onClick={() => setActive(index)}>
      <Text style={style.notActive} className={`cursor-pointer`}>
        {data['name'] ? data['name'] : `${data['isAllEvent'] ? '' : date + ' - '} ${data['title']}`}
      </Text>
    </div>
  );
};

class Dropdown extends Component {
  state = {
    active: null,
    items: [],
    isOpen: false,
    label: '',
    id: '',
    action: () => {},
    isEvent: false,
    usertype: undefined
  };

  componentWillMount() {
    const { items, action, label, id, isActive, Activeid, isEvent, usertype } = this.props;
    if (isActive) {
      this.setState({
        items,
        action,
        label,
        id,
        active: Activeid ? Activeid : items.length - 1,
        usertype
      });
    } else {
      this.setState({ items, action, label, id, usertype });
    }
    this.setState({ isEvent });
  }
  OnHandleActive = active => {
    if (this.state.id) {
      document.getElementById(this.state.id).classList.remove('invalid-field');
    }
    this.state.action(active);
    this.setState({ active, isOpen: false });
  };

  OnHandleOpen = () => {
    const isOpen = !this.state.isOpen;
    this.setState({ isOpen });
  };

  render() {
    return (
      <MDBContainer
        id={this.state.id}
        style={style.main}
        className={`drop-down ${this.props.customClass}`}
      >
        <Active parent={this} />
        <Items parent={this} />
      </MDBContainer>
    );
  }
}

const style = {
  main: {
    backgroundColor: '#4B5755 !important',
    color: '#fff',
    borderRadius: 3,
    padding: '0 1em .1em',
    paddingTop: '.4em',
    position: 'relative',
    marginTop: '10px'
  },
  active: {
    opacity: 0.5,
    font: 'Bold 11px Helvetica',
    margin: 0,
    marginBottom: '1.2em',
    position: 'relative',
    letterSpacing: 0.5,
    top: '.4em'
  },
  notActive: {
    opacity: 1,
    font: 'Bold 11px Helvetica',
    position: 'relative',
    paddingTop: '1.5em',
    letterSpacing: 0.5
  },
  open: {
    marginBottom: '1em'
  },
  caret: {
    position: 'relative',
    left: '.2em',
    fontSize: 14
  },
  collapse: {
    maxHeight: 205,
    overflow: 'auto'
  }
};

export default Dropdown;
