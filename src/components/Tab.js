import React, { Component } from 'react';
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBBtn } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import Button from '../components/Button';
import text from '../constants/text';
import Text from '../components/Text';

class Tab extends Component {
  state = {
    activeItem: '1',
    items: []
  };

  toggle = tab => () => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  componentWillReceiveProps() {}

  render() {
    return (
      <MDBContainer style={style.main}>
        <MDBNav tabs className="justify-content-center">
          <MDBNavItem>
            <NavLink
              to="/"
              className={this.state.activeItem === '1' ? 'active-tab' : ''}
              onClick={this.toggle('1')}
              role="tab"
            >
              <Text style={style.tabTitle}>
                About the event
              </Text>
              <hr />
            </NavLink>
          </MDBNavItem>
          <MDBNavItem>
            <NavLink
              to="#"
              className={this.state.activeItem === '2' ? 'active-tab' : ''}
              onClick={this.toggle('2')}
              role="tab"
            >
              <Text style={style.tabTitle}>
                Login
              </Text>
              <hr />
            </NavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBTabContent className="card" activeItem={this.state.activeItem} style={style.tabs}>
          <MDBTabPane tabId="1" role="tabpanel" className="fade-effect">
            <Text className="text-center" style={style.aboutHeader}>
                About
                <hr style={style.aboutHeaderHr} />
            </Text>
            <Text className="text-center" style={{ ...style.about, ...style.aboutFirst }}>
                {text.about[0]}
            </Text>
            <Text className="text-center mt-2 " style={{ ...style.about, ...style.about }}>
                {text.about[1]}
            </Text>
            <Text className="text-center mt-2 " style={{ ...style.about, ...style.about }}>
                {text.about[2]}
            </Text>
                <Button style={style.buttonSignUp} className='btn-animate-signup'>
                    <Text className="btn-animate-text-signup">
                        Sign Up
                    </Text>
                </Button>
                <Button style={style.buttonLogin} className='btn-animate-login'>
                    <Text className="btn-animate-text-login">
                        Login
                    </Text>
                </Button>
          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel" className="fade-effect">
            <p className="mt-2" style={style.white}>
              Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee
              squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes
              anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress,
              commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo
              nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica
              VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio
              cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry
              richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui
              sapiente accusamus tattooed echo park.
            </p>
          </MDBTabPane>
        </MDBTabContent>
      </MDBContainer>
    );
  }
}

const style = {
  main: {
    width: '63vw'
  },
  tabs: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  white: {
    color: '#fff'
  },
  about: {
    color: '#fff',
    lineHeight: '1.5em',
    fontSize: 15.5
  },
  aboutHeader: {
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 4,
    fontSize: '2.3em',
    position: 'relative',
    top: '.5em',
    marginBottom:'1.6em'
  },
  aboutHeaderHr: {
    borderBottom: '3.2px solid #8ec63f',
    width: '2.45em',
    position: 'relative',
    bottom: '.1em',
    top:'.27em'
  },
  aboutFirst: {
    marginTop: '2em'
  },
  buttonSignUp:{
     border:'solid 1px #8ec63f85',
     color: '#8ec63f',
     width: '23em',
     borderRadius: '5px',
     padding:'.75em',
     textAlign:'center',
     fontSize:'13px',
     fontWeight: 'bolder',
     cursor:'pointer',
     margin:'auto',
     position:'relative',
     top:'1em', 
     height:40
  },
  buttonLogin:{
    border:'1px solid rgba(255, 255, 255, 0.35)',
    color: 'rgba(255, 255, 255, 0.51)',
    width: '23em',
    borderRadius: '5px',
    padding:'.75em',
    textAlign:'center',
    fontSize:'13px',
    fontWeight: 'bolder',
    cursor:'pointer',
    margin:'auto',
    position:'relative',
    top:'2.5em',
    height:40
 },
 tabTitle:{
     marginTop:7,
     marginBottom:1
 }
};
export default Tab;
