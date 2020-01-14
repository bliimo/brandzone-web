import React, { PureComponent } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

class RoundedTextInput extends PureComponent {
  state = {
    showPassword: false
  };

  onToggleShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword
    }));
  };

  render() {
    const { showPassword } = this.state;
    const { fontSize, fontColor, password, onChange, value, placeholder, disabled } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          width: '100%',
          border: '1px solid lightgray',
          borderRadius: 4,
          backgroundColor: 'white'
        }}
      >
        <input
          value={value}
          disabled={disabled}
          placeholder={ placeholder ? placeholder : '' }
          onChange={e => onChange(e.target.value)}
          type={!password || showPassword ? 'text' : 'password'}
          style={{
            display: 'flex',
            flex: 1,
            fontSize,
            color: fontColor,
            border: 'none',
            margin: '8px'
          }}
        />
        {password && (
          <button style={{ backgroundColor: 'transparent', border: 'none' }} type='button' onClick={this.onToggleShowPassword}>
            {showPassword ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
          </button>
        )}
      </div>
    );
  }
}

export default RoundedTextInput;
