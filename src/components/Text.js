import React from 'react';

const Text = ({ children, fontSize, color, textAlign, bold }) => {
  return (
    <p
      style={{
        color,
        fontSize,
        textAlign,
        fontWeight: bold ? 'bold' : 'normal',
      }}
    >
      {children}
    </p>
  );
};

export default Text;
