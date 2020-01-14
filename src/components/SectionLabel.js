/* This is a custom component for the Header HTML element */
import React from 'react';

const SectionLabel = ({ category, children, color, textAlign }) => {
  return <div>{renderHeader(category, color, children, textAlign)}</div>;
};

const renderHeader = (categ, color, children, textAlign) => {
  switch (categ) {
    case 'h1':
      return <h1 style={{ textAlign, color }}>{children}</h1>;
    case 'h2':
      return <h2 style={{ textAlign, color }}>{children}</h2>;
    case 'h3':
      return <h3 style={{ textAlign, color }}>{children}</h3>;
    case 'h4':
      return <h4 style={{ textAlign, color }}>{children}</h4>;
    case 'h5':
      return <h5 style={{ textAlign, color }}>{children}</h5>;
    case 'h6':
      return <h6 style={{ textAlign, color }}>{children}</h6>;
    default:
      return <h1 style={{ textAlign, color }}>{children}</h1>;
  }
};

export default SectionLabel;
