import React, {useState} from 'react';
import GameTable from "./GameTable";
import styles from './Game.module.css';

const SIZE = 3;
const GAME_FIELD = Array(SIZE).fill(Array(SIZE).fill({value:'', isHighlighted: false}));

console.log(GAME_FIELD)
const Game = () => {
    const [cells, setCells] = useState(GAME_FIELD);
    const [currentPlayer, setCurrentPlayer] = useState('');
    const [currentCell, setCurrentCell] = useState([])
    const [winner, setWinner] = useState('');

    function handleResetClick(){
        setCells(GAME_FIELD);
        setCurrentCell([]);
        setCurrentPlayer('');
        setWinner('');
    }
    return (
        <div className={styles.game}>
            <GameTable
                cells={cells}
                setCells={setCells}
                currentPlayer={currentPlayer}
                setCurrentPlayer={setCurrentPlayer}
                currentCell={currentCell}
                setCurrentCell={setCurrentCell}
                winner={winner}
                setWinner={setWinner}
                boardSize={SIZE}
            />
            <button onClick={handleResetClick} type='button' className={styles.button}>Reset</button>
        </div>
    );
};

export default Game;
