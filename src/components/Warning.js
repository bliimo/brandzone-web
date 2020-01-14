import React, { PureComponent } from 'react';

class Warning extends PureComponent {
  render() {
    const { text } = this.props;

    return (
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          padding: '10px 0 10px 0',
          marginBottom: '10px',
          backgroundColor: '#d9534f',
          color: 'white',
          borderRadius: '5px'
        }}
      >
        {text}
      </div>
    );
  }
}

export default Warning;
