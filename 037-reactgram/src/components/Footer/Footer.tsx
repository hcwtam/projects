import React, { ReactElement } from 'react';

interface Props {}

export default function Footer({}: Props): ReactElement {
  return (
    <footer
      style={{
        color: 'rgba(199, 199, 199, 1)',
        fontSize: 11,
        fontWeight: 600,
        lineHeight: 10,
        textTransform: 'uppercase'
      }}
    >
      © 2020 Reactgram from Wesley Tam
    </footer>
  );
}
