import React from "react";

import styles from "./Counter.module.css";

const Counter = (props) => {
  // const changeHandler = (e) =>{
  //     (!isNaN(parseFloat(e.target.value))) ? setWeight(parseFloat(e.target.value)) : setWeight(0);
  //     console.log(weight);
  //   }

  return (
    <div className={styles.Counter}>
      <div onClick={props.dec} className={styles.button}>
        −
      </div>
      <input
        onChange={(e) => {
          if (parseFloat(e.target.value))
            props.changed(parseFloat(e.target.value));
          if (e.target.value === "") props.changed(parseFloat(e.target.value));
          console.log(e.target.value);
        }}
        type="number"
        inputMode="numeric"
        inputmode="numeric"
        android
        required
        placeholder="kg"
        value={props.weight}
      />
      {/* <div style={{padding: 5, paddingLeft: 0, fontSize: 14}}>kg</div> */}
      <div onClick={props.inc} className={styles.button}>
        +
      </div>
    </div>
  );
};

export default Counter;
