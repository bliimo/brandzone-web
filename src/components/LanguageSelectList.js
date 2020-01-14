import React, { PureComponent } from 'react';

class LanguageSelectList extends PureComponent {
  render() {
    const { onChange, initialValue, disabled } = this.props;
    return (
      <select
        disabled={disabled}
        style={{ fontSize: '1.1rem', height: '37px', width: '100%' }}
        className='browser-default language-select'
        onChange={text => {
          onChange({ language: text.target.value });
        }}
      >
        {initialValue === 'None' ? (
          <option value='None' selected>
            Select Language
          </option>
        ) : (
          <option value='None'>Select Language</option>
        )}

        {initialValue === 'English' ? (
          <option value='English' selected>
            {' '}
            English{' '}
          </option>
        ) : (
          <option value='English'> English </option>
        )}

        {initialValue === 'Chinese' ? (
          <option value='Chinese' selected>
            {' '}
            Chinese{' '}
          </option>
        ) : (
          <option value='Chinese'> Chinese </option>
        )}

        {initialValue === 'Thai' ? (
          <option value='Thai' selected>
            {' '}
            Thai{' '}
          </option>
        ) : (
          <option value='Thai'> Thai </option>
        )}

        {initialValue === 'Viet' ? (
          <option value='Viet' selected>
            {' '}
            Viet{' '}
          </option>
        ) : (
          <option value='Viet'> Viet </option>
        )}
      </select>
    );
  }
}

export default LanguageSelectList;
