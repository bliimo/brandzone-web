import React, { PureComponent } from 'react';

class DateSelector extends PureComponent {
  render() {
    const { fontSize, fontColor, onChange, value, disabled } = this.props;
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
          type='date'
          value={value}
          disabled={disabled}
          onChange={e => onChange(e.target.value)}
          style={{
            display: 'flex',
            flex: 1,
            fontSize,
            color: fontColor,
            border: 'none',
            margin: '8px'
          }}
        />
      </div>
    );
  }
}

export default DateSelector;
