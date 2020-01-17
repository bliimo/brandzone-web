import React from 'react';

const Text = ({ children, style, className }) => { 
  return (
    <p
      className={className}
      style={style}
    >
      {children}
    </p>
  );
};

export default Text;
