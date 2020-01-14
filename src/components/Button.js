import React from 'react';

const Button = ({ style, children, className, id }) => {
  return (
    <div style={style} className={className} id={id}>
        {children}
    </div>
  );
};

export default Button;
