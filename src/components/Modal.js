import React from 'react';

const Modal = ({ children, onBackdropClick }) => {
  const onClick = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e)
  }

  return (
    <div
      onClick={event => onClick(event)}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        minHeight: '100vh',
        minWidth: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
      }}
    >
      {children}
    </div>
  );
};

export default Modal;
