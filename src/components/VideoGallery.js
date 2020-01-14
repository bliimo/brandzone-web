import React, { PureComponent } from 'react';
import VideoThumbnail from './VideoThumbnail';

export default class VideoGallery extends PureComponent {
  
  state = {
    currentVideo: this.props.videos[0].videourl
  }
  
  vidObject = this.refs.vid;

  showCurrentVideo = (videourl) => {
    this.setState({
        currentVideo: videourl
    });
  }

  render(){
  return (
      <div>
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '350px',
            backgroundColor: '#000',
            borderRadius: 8,
            }}>
            <video id="vid" style={{width: 'auto', height: '100%'}} src={this.state.currentVideo} controls autoPlay></video>
        </div>

        <div style={{ 
            display: 'flex',
            flexDirection: 'row',
            marginTop: 10,
            paddingBottom: 10,
            width: '100%',
            alignItems: 'left',
            overflow: 'auto',
            }}>
            {this.props.videos.map((item, index) => (
                <VideoThumbnail key={index.toString()} videourl={item.videourl} showCurrentVideo={this.showCurrentVideo} />
            ))}
        </div>

      </div>
  );
  }
};