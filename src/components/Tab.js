import React, { Component } from "react";
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem } from "mdbreact";
import { NavLink } from 'react-router-dom';

class Tab extends Component {
state = {
  activeItem: "1",
  items:[]
}

toggle = tab => () => {
  if (this.state.activeItem !== tab) {
    this.setState({
        activeItem: tab
    });
  }
}

componentWillReceiveProps(){ 
}

render() {
    return (
      <MDBContainer>
        <MDBNav tabs className="justify-content-center">
            <MDBNavItem>
                <NavLink
                to="/"
                className={this.state.activeItem === '1' ? 'active-tab':''}
                onClick={this.toggle("1")}
                role="tab"
                >About the event
                <hr/>
                </NavLink>
            </MDBNavItem>
            <MDBNavItem>
                <NavLink
                to="#"
                className={this.state.activeItem === '2' ? 'active-tab':''}
                onClick={this.toggle("2")}
                role="tab"
                >Login
                <hr/>
                </NavLink>
            </MDBNavItem>
        </MDBNav>
        <MDBTabContent
          className="card"
          activeItem={this.state.activeItem}
          style={style.tabs}
        >
          <MDBTabPane tabId="1" role="tabpanel" >
            <p className="mt-2" style={style.white}>
              Raw denim you probably haven't heard of them jean shorts
              Austin. Nesciunt tofu stumptown aliqua, retro synth master
              cleanse. Mustache cliche tempor, williamsburg carles vegan
              helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher
              synth. Cosby sweater eu banh mi, qui irure terry richardson
              ex squid. Aliquip placeat salvia cillum iphone. Seitan
              aliquip quis cardigan american apparel, butcher voluptate
              nisi qui.
            </p>
          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel">
            <p className="mt-2" style={style.white}>
              Food truck fixie locavore, accusamus mcsweeney's marfa nulla
              single-origin coffee squid. Exercitation +1 labore velit,
              blog sartorial PBR leggings next level wes anderson artisan
              four loko farm-to-table craft beer twee. Qui photo booth
              letterpress, commodo enim craft beer mlkshk aliquip jean
              shorts ullamco ad vinyl cillum PBR. Homo nostrud organic,
              assumenda labore aesthetic magna delectus mollit. Keytar
              helvetica VHS salvia yr, vero magna velit sapiente labore
              stumptown. Vegan fanny pack odio cillum wes anderson 8-bit,
              sustainable jean shorts beard ut DIY ethical culpa terry
              richardson biodiesel. Art party scenester stumptown, tumblr
              butcher vero sint qui sapiente accusamus tattooed echo park.
            </p>
          </MDBTabPane>
        </MDBTabContent>
      </MDBContainer>
    );
  }
}

const style = {
    tabs:{
        backgroundColor:'transparent',
        boxShadow: 'none'
    },
    white:{
        color:'#fff'
    }
}
export default Tab;