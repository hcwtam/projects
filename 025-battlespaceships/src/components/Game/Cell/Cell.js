import React from "react";

import styles from "./Cell.module.css";

// const initialAddClass = "";

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "placed":
//       return styles.placed;
//     case "destroyed":
//       return styles.destroyed;
//     case "missed":
//       return styles.missed;
//     default:
//       throw new Error();
//   }
// };

const Cell = ({ x, y, id, hovered, clicked, selected, destroyed, missed }) => {
  //   const [addClass, dispatch] = useReducer(reducer, initialAddClass);

  //   if (selected) dispatch({ type: "placed" });
  let addClass = "";
  if (selected) addClass = styles.selected;
  if (destroyed) addClass = styles.destroyed;
  if (missed) addClass = styles.missed;

  return (
    <div
      className={`${styles.Cell} ${addClass}`}
      onMouseEnter={hovered}
      onClick={clicked}
    ></div>
  );
};

export default Cell;
