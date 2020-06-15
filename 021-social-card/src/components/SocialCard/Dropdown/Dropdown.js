import React, {useState, useEffect, useRef, useCallback} from 'react';

import styles from './Dropdown.module.css';

const Dropdown = () => {
    const [clicked, setClicked] = useState(false);
    const ref = useRef(null);

    
    let menu = null;
    
    const dropdownHandler = useCallback((event) => {
        setClicked(!clicked);
        if (!ref.current.contains(event.target)) setClicked(false);
    },[clicked]);
    if (clicked) {
        menu = (
            <div className={styles.Menu}>
                <div><i className="fa fa-ban" />Hide</div>
                <div><i className="fa fa-flag" />Report</div>
            </div>
        );
    }
    
    useEffect(() => {
        document.addEventListener("click", dropdownHandler);
        return () => {
            document.removeEventListener("click", dropdownHandler);
        };
        }, [dropdownHandler]);

    return (
        <div ref={ref}>
            <div ref={ref}className={styles.Dropdown + " fa fa-angle-down"} onClick={dropdownHandler} />
            {menu}
        </div>
    );
};

export default Dropdown;