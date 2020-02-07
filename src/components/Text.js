import React from 'react';

const Text = ({ children, style, className }) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export default Text;
