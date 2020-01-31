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
      <Text style={style.active} className={`${isOpen ? 'opacity-1' : 'opacity-.5'}`}>
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
  items.map((e, i) =>
    elem.push(<Item data={e} index={i} key={e.id} setActive={parent.OnHandleActive} />)
  );
  return (
    <MDBCollapse className='absolute-collapse' isOpen={isOpen}>
      <div className='ml-3 mr-3 mb-4 mt-3'>{elem}</div>
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
    action: () => {}
  };

  componentWillMount() {
    const { items, action, label, id, isActive } = this.props;
    if (isActive) {
      this.setState({ items, action, label, id, active: items.length - 1 });
    } else {
      this.setState({ items, action, label, id });
    }
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
      <MDBContainer id={this.state.id} style={style.main} className='drop-down'>
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
    paddingTop: '1.1em',
    letterSpacing: 0.5
  },
  open: {
    marginBottom: '1em'
  },
  caret: {
    position: 'relative',
    left: '.2em',
    fontSize: 14
  }
};

export default Dropdown;
