import React, { PureComponent } from 'react';
import Thumbnail from './Thumbnail';

export default class PhotoGallery extends PureComponent {
  state = {
    currentPhoto: this.props.photos[0].imageurl
  }

  showCurrentPhoto = (imageurl) => {
    this.setState({
        currentPhoto: imageurl
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
            backgroundColor: '#eee',
            backgroundImage: 'url(' + this.state.currentPhoto + ')',
            backgroundSize: 'contain',
            backgroundPosition: 'top',
            backgroundRepeat: 'no-repeat',
            borderRadius: 8,
            }}>
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
            {this.props.photos.map((item, index) => (
                <Thumbnail key={index.toString()} imageurl={item.imageurl} showCurrentPhoto={this.showCurrentPhoto} />
            ))}
        </div>

      </div>
  );
  }
};