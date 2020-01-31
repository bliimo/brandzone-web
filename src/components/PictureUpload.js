import React, { Component } from 'react';
import { MDBInput, MDBIcon } from 'mdbreact';
import Text from './Text';
class PictureUpload extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  state = {
    OnHandlePicture: () => {}
  };

  OnHandleOpenFile = () => {
    this.fileInput.click();
  };

  componentWillMount() {
    const { OnHandlePicture } = this.props;
    this.setState({ OnHandlePicture });
  }

  render() {
    const { parent } = this.props;
    return (
      <div style={style.main} id='main-pic-upload'>
        <div
          className={`text-center cursor-pointer ${parent.state.profilePic != null ? 'p-3' : ''}`}
          onClick={() => this.OnHandleOpenFile()}
          style={style.box}
        >
          {parent.state.profilePic ? (
            <img style={style.profile} src={parent.state.profilePic} alt='profile' />
          ) : (
            <div>
              <MDBIcon icon='plus' style={style.icon} />
              <Text className='upload-text'>
                Upload a <br />
                Profile Picture
              </Text>
            </div>
          )}
        </div>
        <MDBInput
          type='file'
          inputRef={fileInput => (this.fileInput = fileInput)}
          className='d-none'
          onChange={this.state.OnHandlePicture}
        ></MDBInput>
      </div>
    );
  }
}
const style = {
  icon: {
    color: '#fff',
    opacity: 0.5
  },
  box: {
    backgroundColor: '#4B5755',
    padding: '2.3em 1em',
    borderRadius: 4
  },
  main: {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '2.5em 4.6em 1.3em 4.6em',
    borderRadius: 4,
    marginTop: '.8em',
    marginBottom: '1.3em'
  },
  profile: {
    height: 120,
    width: 120,
    objectFit: 'contain'
  }
};
export default PictureUpload;
