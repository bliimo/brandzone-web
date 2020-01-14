import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBIcon, MDBContainer } from "mdbreact";
import { NavLink } from 'react-router-dom';
import SideBar from './SideBar';

const Profile = ({OnHandleShowSideBar}) =>{
  return (
    <div style={{display: 'flex'}}>
      <div style={{display: 'flex'}} id='profile-lg'>
        <img src={'https://i.pravatar.cc/28'} style={style.avatar} alt='profile'/>
        <p style={style.userName}>Hi, User Name!</p>
        <span style={style.divider}></span>
      </div>
      <span onClick={()=> OnHandleShowSideBar()}>
          <MDBIcon icon="bars" style={style.bars} id='bars'/>
      </span>
    </div>
  )
}

class Header extends Component {

  state = {
    show: false,
    isLoggedIn: true
  }

  OnHandleShowSideBar = () =>{
    console.log(!this.state.show)
    this.setState({show: !this.state.show})
  }

  render() {
    return (
        <div>
            <MDBNavbar color='transparent' expand='md' className='header-nav'>
            <MDBNavbarBrand>
            <NavLink to="/">
              <strong style={style.brand}>Brandzone</strong>
            </NavLink>
            </MDBNavbarBrand>
              <MDBNavbarNav right style={{display:this.state.isLoggedIn ? 'block' : 'none'}} >
                <MDBNavItem>
                  <Profile OnHandleShowSideBar={this.OnHandleShowSideBar}/>
                </MDBNavItem> 
              </MDBNavbarNav>
          </MDBNavbar>
          <SideBar show={this.state.show} OnHandleShowSideBar={this.OnHandleShowSideBar}/>
        </div>
      );
    }
}

const style={
  userName:{
    position:'relative',
    top:6,
    paddingLeft: '1em',
    paddingRight: '1em',
    fontWeight:'bold',
    color: '#fff',
  },
  bars:{
    position:'relative',
    top:4
  },
  brand:{
    color: '#fff'
  },
  divider:{
    marginLeft: '.6em',
    marginRight: '1.6em',
    height:15,
    width:1,
    border:'0.1px solid rgba(255, 255, 255, 0.28)',
    position:'relative',
    top:7,
  },
  avatar:{
    height:30,
    width:30,
    borderRadius:4
  }

}
export default Header;