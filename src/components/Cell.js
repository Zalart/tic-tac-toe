import React, {useState} from 'react';
import styles from './Cell.module.css';
import x from '../assets/images/cross.svg';
import o from '../assets/images/o.svg';
const Cell = ({rowIdx, cellIdx, content, cellClickHandler, size, isSelected, currentPlayer, winner}) => {
    const [isHovering, setIsHovering] = useState(false);

    function handleMouseOver() {
        setIsHovering(true);
    }
    function handleMouseOut() {
        setIsHovering(false);
    }

    return (
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{width: `calc(100% * (1/${size}) - ${size*0.1}rem)`, height: `calc(100% * (1/${size}) - ${size*0.1}rem)`, opacity: `${(!winner && !content && isHovering) ? 0.5 : 1}`}} className={`${styles.cell} ${isSelected && styles.selected}`} onClick={()=> cellClickHandler(rowIdx, cellIdx)}>
            {content && <img src={content === 'O' ? o : x } />}
            {!winner && isHovering && content === '' && <img src={currentPlayer === 'O' ? o : x } /> }
        </div>
    );
};

export default Cell;
