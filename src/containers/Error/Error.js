import React, { Component } from 'react';

class Error extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return <p className='text-light'>Error pages</p>;
  }
}

export default Error;
