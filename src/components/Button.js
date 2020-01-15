import React from 'react';

const Button = ({ style, children, className, id, onClick  }) => {
  return (
    <div style={style} className={className} id={id} onClick={onClick}>
        {children}
    </div>
  );
};

export default Button;
