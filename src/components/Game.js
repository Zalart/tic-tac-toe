import React, {useState} from 'react';
import GameTable from "./GameTable";
import styles from './Game.module.css';

const SIZE = 4;
const Game = () => {
    const [cells, setCells] = useState(Array(SIZE*SIZE).fill(''));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [winner, setWinner] = useState('');

    function handleResetClick(){
        setCells(Array(SIZE*SIZE).fill(''));
        setCurrentPlayer('X');
        setWinner('');
    }
    return (
        <div className={styles.game}>
            <GameTable
                cells={cells}
                setCells={setCells}
                currentPlayer={currentPlayer}
                setCurrentPlayer={setCurrentPlayer}
                winner={winner}
                setWinner={setWinner}
                boardSize={SIZE} />
            <button onClick={handleResetClick} type='button' className={styles.button}>Reset</button>
        </div>
    );
};

export default Game;
