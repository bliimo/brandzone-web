import React, { Component } from 'react';
import { MDBContainer, MDBIcon, MDBCollapse } from 'mdbreact';
import Text from '../components/Text';

const Active = ({ parent }) => {
  const { active, items, isOpen } = parent.state;
  let index = null;

  if (active != null) {
    items.map((v, i) => {
      if (v.id === active) index = i;
    });
  }

  return (
    <div className='cursor-pointer' onClick={() => parent.OnHandleOpen()}>
      <Text style={style.active} className={`${index != null ? 'opacity-1' : 'opacity-.5'}`}>
        {index != null ? items[index]['name'] : parent.state.label}
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
  items.map(e => elem.push(<Item data={e} key={e.id} setActive={parent.OnHandleActive} />));
  return (
    <MDBCollapse className='absolute-collapse' isOpen={isOpen}>
      <div className='ml-3 mr-3 mb-4 mt-3'>{elem}</div>
    </MDBCollapse>
  );
};

const Item = ({ data, setActive }) => {
  return (
    <div onClick={() => setActive(data['id'])}>
      <Text style={style.notActive} className={`cursor-pointer`}>
        {data['name']}
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
    action: () => {}
  };

  componentWillMount() {
    const { items, action, label } = this.props;
    this.setState({ items, action, label });
  }
  OnHandleActive = active => {
    this.state.action(active);
    this.setState({ active, isOpen: false });
  };

  OnHandleOpen = () => {
    const isOpen = !this.state.isOpen;
    this.setState({ isOpen });
  };

  render() {
    return (
      <MDBContainer style={style.main} className='drop-down'>
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
