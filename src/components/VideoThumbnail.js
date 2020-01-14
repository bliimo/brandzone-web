import React, { PureComponent } from 'react';
import { FaPlayCircle } from 'react-icons/fa';

export default class VideoThumbnail extends PureComponent {

  render(){
  return (
    <div
      onClick={()=>
        this.props.showCurrentVideo(this.props.videourl)
      }
      style={{
        backgroundColor: 'lightgray',
        display: 'flex',
        minWidth: 100,
        minHeight: 100,
        borderRadius: 8,
        padding: 0,
        margin: 10,
        justifyContent: 'space-evenly',
      }}>
      <div style={{top:0, bottom:0, margin:'auto'}}>
        <FaPlayCircle color='#fff' size={40} />
      </div>      
    </div>
  );
  }
};