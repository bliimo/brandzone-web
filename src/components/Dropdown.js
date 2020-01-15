import React, { Component } from 'react';
import { MDBContainer, MDBIcon, MDBCollapse } from 'mdbreact';
import Text from '../components/Text';

const Active = ({ parent }) => {
  const { active, items, isOpen } = parent.state;
  return (
    <div className='cursor-pointer' onClick={() => parent.OnHandleOpen()}>
      <Text style={style.active} className={`${active != null ? 'opacity-1' : 'opacity-.5'}`}>
        {active != null ? items[active]['name'] : parent.state.label}
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
  return <MDBCollapse isOpen={isOpen}>{elem}</MDBCollapse>;
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
    zIndex: 1,
    action: () => {}
  };

  componentWillMount() {
    const { items, action, label, zIndex } = this.props;
    this.setState({ items, action, label, zIndex });
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
    let zIndex = { zIndex: this.state.zIndex };
    let mainStyle = { ...style.main, ...zIndex };
    return (
      <MDBContainer style={mainStyle} className='drop-down'>
        <Active parent={this} />
        <Items parent={this} />
      </MDBContainer>
    );
  }
}

const style = {
  main: {
    background: '#475459 0% 0% no-repeat padding-box',
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
    top: '.4em'
  },
  notActive: {
    opacity: 1,
    font: 'Bold 11px Helvetica',
    position: 'relative',
    paddingTop: '1.1em'
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
