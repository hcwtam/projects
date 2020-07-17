import React, { useState, useEffect } from 'react';

import quotes from '../quotes';

const Main = () => {
  const [input, setInput] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (quotes[index] === input && index < quotes.length - 1) {
      setIndex(index + 1);
      setInput('');
    }
  }, [input, index]);

  const letterCheck = (el: string, i: number): { color?: string } => {
    let styles = {};
    if (input.length > i) {
      el === input[i]
        ? (styles = { color: '#61dafb' })
        : (styles = { color: '#fb6961' });
    }
    return styles;
  };

  const currentQuote = quotes[index].split('').map((el, i) => (
    <span style={letterCheck(el, i)} key={i}>
      {el}
    </span>
  ));

  const nextQuote =
    index < quotes.length - 1 ? (
      <div className="next">
        <span>NEXT</span>
        {quotes[index + 1]}
      </div>
    ) : (
      <div className="next">
        <span>END</span>
      </div>
    );

  return (
    <div className="Main">
      <div>{currentQuote}</div>
      <input
        autoFocus
        placeholder="Type the sentence above"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      ></input>
      {nextQuote}
    </div>
  );
};

export default Main;
