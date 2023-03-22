import React, {useEffect, useState} from 'react';
import styles from './GameTable.module.css';
import Cell from "./Cell";

const GameTable = ({
                       cells,
                       setCells,
                       currentPlayer,
                       setCurrentPlayer,
                       currentCell,
                       setCurrentCell,
                       boardSize,
                       winner,
                       setWinner,
                       winSelect, setWinSelect
                   }) => {

    useEffect(() => {
        checkBoard(currentCell, boardSize);
    }, [cells]);


    function cellClickHandler(rowIndex, cellIndex) {
        if (!winner) {         // block the board
            setCurrentCell([rowIndex, cellIndex]);
            setCells(prev => {
                return prev.map((row, i) => {
                    if (rowIndex === i) {
                        return row.map((cell, idx) => {
                            if (!cell && idx === cellIndex) {
                                return currentPlayer
                            }
                            return cell;
                        })
                    }
                    return row;
                })
            });
        }
    }

    function checkBoard(coords, boardSize) {
        if (cells[coords[0]] && cells[coords[0]].every(cell => cell === currentPlayer)) { // check horizontal line "—"
            setWinner(currentPlayer);
        }

        if (cells.map((row) => row.filter((cell, i) => i === coords[1])).every(cell => cell[0] === currentPlayer)) { // check vertical line "|"
            setWinSelect(cells.map((row) => row.findIndex((cell, i) => i === coords[1])));
            setWinner(currentPlayer);
        }

        if (coords[0] === coords[1]) { // find whether we the move is in diagonal "\"
            if (cells.map((row, k) => row.filter((cell, i) => i === k)).every(cell => cell[0] === currentPlayer)) {
                setWinner(currentPlayer);
            }
        }

        if (boardSize - coords[0] - 1 === coords[1]) { // find whether we the move is in diagonal "/"
            if (cells.map((row, k) => row.filter((cell, i) => boardSize - i - 1 === k)).every(cell => cell[0] === currentPlayer)) {
                setWinner(currentPlayer);
            }
        }

        !winner && nextMove();
    }

    function nextMove() {
        let nextPlayer;
        if (currentCell.length === 2) {
            nextPlayer = cells[currentCell[0]][currentCell[1]] === 'O' ? 'X' : 'O';
        } else {
            nextPlayer = 'X'
        }
        setCurrentPlayer(nextPlayer);
    }

    return (<>
            <div className={winner ? styles.table + ' ' + styles.winner : styles.table}>
                {cells.map((row, rowIndex) => {
                    return row.map((cell, cellIndex) => <Cell key={rowIndex.toString() + cellIndex.toString()}
                                                              rowIdx={rowIndex}
                                                              cellIdx={cellIndex}
                                                              content={cell}
                                                              cellClickHandler={cellClickHandler}
                                                              size={boardSize}
                                                              isSelected={winSelect[rowIndex] === cellIndex}
                    />)
                })}
            </div>
            {
                winner && <div> The winner is {cells[currentCell[0]][currentCell[1]]}</div>
            }
        </>
    );
};

export default GameTable;
