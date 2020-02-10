import React from 'react';

const Text = ({ children, style, className, title }) => {
  return (
    <div className={className} style={style} title={title}>
      {children}
    </div>
  );
};

export default Text;
