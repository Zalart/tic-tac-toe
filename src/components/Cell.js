import React from 'react';
import styles from './Cell.module.css';
const Cell = ({idx, content, cellClickHandler, size}) => {
    return (
        <div style={{width: `calc(100% * (1/${size}) - 2px)`, height: `calc(100% * (1/${size}) - 2px)`}} className={styles.cell} onClick={()=> cellClickHandler(idx)}>
            {content}
        </div>
    );
};

export default Cell;
