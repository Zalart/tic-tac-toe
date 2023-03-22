import React from 'react';
import styles from './Cell.module.css';
const Cell = ({rowIdx, cellIdx, content, cellClickHandler, size, isSelected}) => {
    return (
        <div style={{width: `calc(100% * (1/${size}) - 2px)`, height: `calc(100% * (1/${size}) - 2px)`}} className={`${styles.cell} ${isSelected && styles.selected}`} onClick={()=> cellClickHandler(rowIdx, cellIdx)}>
            {content}
        </div>
    );
};

export default Cell;
