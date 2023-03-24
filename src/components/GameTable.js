import React, {useEffect} from 'react';
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
                       currentMove,
                       setCurrentMove
                   }) => {

    useEffect(() => {
        console.log('rerender the table')
        checkBoard(currentCell, boardSize);
    }, [cells]);


    function cellClickHandler(rowIndex, cellIndex) {
        if (!winner) {         // block the board
            setCurrentCell([rowIndex, cellIndex]);
            setCurrentMove(prev=> ++prev);
            setCells(prev => {
                return prev.map((row, i) => {
                    if (rowIndex === i) {
                        return row.map((cell, idx) => {
                            if (!cell.value && idx === cellIndex) {
                                return {...cell, value: currentPlayer}
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
        // fallback to draw
        if (!winner && currentMove === boardSize * boardSize) {
            setWinner('-');
        }
        // check horizontal line "—"
        if (cells[coords[0]] && cells[coords[0]].every(cell => cell.value === currentPlayer)) {
            setCells(prev => {
                return prev.map((row, i) => {
                    if (coords[0] === i) {
                        return row.map((cell) => {
                            return {...cell, isHighlighted: true}
                        })
                    }
                    return row;
                });
            })
            setWinner(currentPlayer);
        }

        // check vertical line "|"
        if (cells.map((row) => row.filter((cell, i) => i === coords[1])).every(cell => cell[0] && cell[0].value === currentPlayer)) {
            setCells(prev => {
                return prev.map((row) => {
                    return row.map((cell, i) => {
                        if (coords[1] === i) {
                            return {...cell, isHighlighted: true}
                        }
                        return cell
                    })
                });
            })
            setWinner(currentPlayer);
        }

        // find whether we the move is in diagonal "\"
        if (coords[0] === coords[1]) { //check to prevent surplus loop
            if (cells.map((row, k) => row.filter((cell, i) => i === k)).every(cell => cell[0].value && cell[0].value === currentPlayer)) {
                setCells(prev => {
                    return prev.map((row, rowIdx) => {
                        return row.map((cell, cellIdx) => {
                            if (rowIdx === cellIdx) {
                                return {...cell, isHighlighted: true}
                            }
                            return cell;
                        })
                    })
                })
                setWinner(currentPlayer);
            }
        }

        // find whether we the move is in diagonal "/"
        if (boardSize - coords[0] - 1 === coords[1]) {  //check to prevent surplus loop
            if (cells.map((row, k) => row.filter((cell, i) => boardSize - 1 - i === k)).every(cell => cell[0].value === currentPlayer)) {
                setCells(prev => {
                    return prev.map((row, rowIdx) => {
                        return row.map((cell, cellIdx) => {
                            if (boardSize - 1 - cellIdx === rowIdx) {
                                return {...cell, isHighlighted: true}
                            }
                            return cell;
                        })
                    })
                })
                setWinner(currentPlayer);
            }
        }

           !winner && nextMove();

    }

    function nextMove() {
        let nextPlayer;
        if (currentCell.length === 2) { // if game in progress and coordinates of move are saved
            nextPlayer = cells[currentCell[0]][currentCell[1]].value === 'O' ? 'X' : 'O';
        } else {
            nextPlayer = 'X'
        }
        setCurrentPlayer(nextPlayer);
    }

    return (<>
            <div
                className={winner ? styles.table + ' ' + styles.winner : styles.table}
                style={{gap: `${(boardSize + 1) * 0.1}rem`}}>
                {cells.map((row, rowIndex) => {
                    return row.map((cell, cellIndex) => <Cell key={rowIndex.toString() + cellIndex.toString()}
                                                              rowIdx={rowIndex}
                                                              cellIdx={cellIndex}
                                                              content={cell.value}
                                                              cellClickHandler={cellClickHandler}
                                                              size={boardSize}
                                                              isSelected={cell.isHighlighted}
                                                              currentPlayer={currentPlayer}
                                                              winner={winner}
                    />)
                })}
            </div>
            {
                winner === '-' && <div>Draw \ -_- /</div>
            }
            {

                winner && winner !== '-' && <div> The winner is {cells[currentCell[0]][currentCell[1]].value}</div>

            }
        </>
    );
};

export default GameTable;
