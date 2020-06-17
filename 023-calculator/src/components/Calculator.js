import React, {useState, useEffect, useCallback} from 'react';

import styles from './Calculator.module.css';
import Display from './Display/Display';
import Numpad from './Numpad/Numpad';

const Calculator = () => {
    const [answer, setAnswer] = useState(0);
    const [equation, setEquation] = useState('');

    const inputHandler = useCallback(input => {
        if (equation.length < 30) setEquation(prev => prev + input);
    }, [equation.length])
    
    const clearHandler = useCallback(() => {
        setAnswer(0);
        setEquation('');
    }, [])
    
    const calculateHandler = useCallback(() => {
        let result;
        try {
            // eslint-disable-next-line no-eval
            result = eval(equation);
        } catch {
            setAnswer(prev => prev);
            return;
        }
        if (result >= 10 ** 10 - 1) result = result.toExponential(3);
        result = result.toString();
        if (result) {
            if (result.length > 10) result = result.slice(0, 10);       
            setAnswer(result);
        }
        setEquation('');
    }, [equation])

    const deleteHandler = useCallback(()=> {
        if (equation.length > 0) setEquation(prev => prev.slice(0, -1))
    }, [equation.length])

    const keyPressHandler = useCallback(event => {
        const {key, keyCode, shiftKey} = event;
        console.log(key, keyCode, event);
        switch (true) {
            // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -, .
            case (((keyCode >= 48 && keyCode <=57) || keyCode === 173 || keyCode === 190) && !shiftKey):
                inputHandler(key);
                break;
            // '/' key
            case (keyCode === 191): {
                event.preventDefault();
                inputHandler(key);
                break;
            }
            // +, * , (, )
            case ((keyCode === 61 || keyCode === 56 || keyCode === 57 || keyCode === 48) && shiftKey ):
                inputHandler(key);
                break;
            case (keyCode === 13):
                calculateHandler();
                break;
            case (keyCode === 8):
                deleteHandler();
                break;
            // case ():
                
            //     break;
        
            default:
                break;
        }
    }, [inputHandler, calculateHandler, deleteHandler]);

    useEffect(()=> {
        window.addEventListener('keydown', keyPressHandler);
        return () => {
            window.removeEventListener('keydown', keyPressHandler);
        }
    },[keyPressHandler]);

    return (
        <div className={styles.Calculator}>
            <Display answer={answer} equation={equation}/>
            <Numpad 
                clicked={input => inputHandler(input)}
                calculate={calculateHandler}
                clear={clearHandler}/>
        </div>
    );
};

export default Calculator;