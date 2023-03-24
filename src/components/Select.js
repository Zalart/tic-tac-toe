import React from 'react';
import styles from './Select.module.css';

const Select = ({size, changeTableSize}) => {

    function createOptions() {
        const result = [];
        for (let i = 2; i <= 10; i++) {
            result.push(<option key={i} value={i}>{i}</option>)
        }
        return result;
    }
    function handleOptionChange(e) {
        changeTableSize(+e.target.value);
    }
    const options = createOptions();


    return (<div className={styles.container}>
            <label htmlFor='size'>Table Size</label>
            <select value={size} name='size' onChange={handleOptionChange}>
                {options}
            </select>
        </div>
    );
};

export default Select;
