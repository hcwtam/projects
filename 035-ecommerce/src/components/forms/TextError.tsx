import React from 'react';

interface Props {
  children: React.ReactNode;
}

function TextError(props: Props) {
  return <div className="error">{props.children}</div>;
}

export default TextError;
