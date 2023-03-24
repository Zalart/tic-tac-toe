import React, {useState} from 'react';
import GameTable from "./GameTable";
import styles from './Game.module.css';
import Select from "./Select";
import ResetButton from "./ResetButton";

const Game = () => {
    const [size, setSize] = useState(3);
    const [cells, setCells] = useState(fillTable(size));
    const [currentPlayer, setCurrentPlayer] = useState('');
    const [currentCell, setCurrentCell] = useState([]);
    const [currentMove, setCurrentMove] = useState(0);
    const [winner, setWinner] = useState('');

    function fillTable(n) {
        return Array(n).fill(Array(n).fill({value:'', isHighlighted: false}))
    }

    function changeTableSize(newSize) {
        setSize(newSize);
        setCells(fillTable(newSize));
        setCurrentCell([]);
        setCurrentPlayer('');
        setWinner('');
        setCurrentMove(0);

    }

    function handleResetTable(){
        setCells(fillTable(size));
        setCurrentCell([]);
        setCurrentPlayer('');
        setWinner('');
        setCurrentMove(0);
    }
    return (
        <div className={styles.game}>
            <Select size={size} changeTableSize={changeTableSize} />
            <GameTable
                cells={cells}
                setCells={setCells}
                currentPlayer={currentPlayer}
                setCurrentPlayer={setCurrentPlayer}
                currentCell={currentCell}
                setCurrentCell={setCurrentCell}
                winner={winner}
                setWinner={setWinner}
                boardSize={size}
                currentMove={currentMove}
                setCurrentMove={setCurrentMove}
            />
            <ResetButton restartHandler={handleResetTable} />
            {/*<button onClick={handleResetTable} >Reset</button>*/}
        </div>
    );
};

export default Game;
