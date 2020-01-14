import React, { PureComponent } from 'react';

class SelectListGroup extends PureComponent {
  render() {
    const { onChange, options, initialValue, disabled } = this.props;

    const selectOptions = options.map((option, index) => (
      <option
        key={index}
        disabled={disabled}
        selected={initialValue === option.value ? true : false}
        value={option.value}
      >
        {option.label}
      </option>
    ));

    return (
      <select
        style={{ fontSize: '1.1rem', height: '37px', width: '100%' }}
        className="browser-default language-select"
        onChange={text => {
          onChange({ language: text.target.value });
        }}
      >
        {selectOptions}
      </select>
    );
  }
}

export default SelectListGroup;
