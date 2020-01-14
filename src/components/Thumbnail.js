import React, { PureComponent } from 'react';

export default class Thumbnail extends PureComponent {

  render(){
  return (
    <div
      onClick={()=>
        this.props.showCurrentPhoto(this.props.imageurl)
      }
      style={{
        backgroundColor: '#fff',
        backgroundImage: 'url(' + this.props.imageurl + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        minWidth: 100,
        minHeight: 100,
        borderRadius: 8,
        padding: 0,
        margin: 10,
        justifyContent: 'space-evenly',
      }}>
    </div>
  );
  }
};