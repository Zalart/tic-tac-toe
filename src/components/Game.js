import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {
    setSize,
    createCells,
    setCurrentPlayer,
    setCurrentCell,
    setWinner
} from "../store/features/gameTable/gameTableSlice";
import GameTable from "./GameTable";
import styles from './Game.module.css';
import Select from "./Select";
import ResetButton from "./ResetButton";
import Modal from "./Modal/Modal";

const Game = () => {
    const size = useSelector((state) => state.board.size);
    const winner = useSelector((state) => state.board.winner);
    const dispatch = useDispatch();

    function changeTableSize(newSize) {
        dispatch(setSize(newSize));
        handleResetTable(newSize);
    }

    function handleResetTable(size){
        dispatch(createCells({size}));
        dispatch(setCurrentCell([]));
        dispatch(setCurrentPlayer({currentPlayer: ''}));
        dispatch(setWinner(''));
    }
    function closeGameResults() {
        dispatch(setWinner(''));
        handleResetTable(size);
    }
    return (
        <>
        <div className={styles.game}>
            <Select size={size} changeTableSize={changeTableSize} />
            <GameTable
                winner={winner}
                setWinner={setWinner}
                boardSize={size}
            />
            <ResetButton restartHandler={() => handleResetTable(size)} />
        </div>
            <Modal title='Game Over' visible={winner} setVisible={closeGameResults}>
                {winner === '-' && <div>Draw \ -_- /</div>}
                {
                    winner && winner !== '-' && <div>The winner is {winner}</div>
                }
            </Modal>
        </>
    );
};

export default Game;
