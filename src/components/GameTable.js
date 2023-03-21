import React, {useEffect, useState} from 'react';
import styles from './GameTable.module.css';
import Cell from "./Cell";

const GameTable = ({cells, setCells, currentPlayer, setCurrentPlayer, boardSize, winner, setWinner}) => {
    const [currentCell, setCurrentCell] = useState(0);

    useEffect(() => {
        whoSWon(currentCell, boardSize, cells);
    }, [cells])

    function cellClickHandler(index) {
        if (!winner) {         // block the board
            setCurrentCell(index);
            setCells(prev => {
                return prev.map((cell, i) => {
                    if (!cell && i === index) {
                        return currentPlayer
                    }
                    return cell;
                })
            });
        }
    }

    function whoSWon(idx, size = 3) {
        // what the values of a cells in a row where is the selected cell at
        const row = Math.ceil((idx + 1) / size);
        const firstCellInARow = (size * row) - size;
        const rowValues = cells.slice(firstCellInARow, firstCellInARow + size);
        if (rowValues.every(value => value === currentPlayer) && rowValues.length === size) {
            console.log('1 case')
            setWinner(currentPlayer);
        }

        // what are the values of a cells in a column where is the selected cell at, check when the value will be set
        let colData = [cells[idx]];
        let upIdx = idx;
        while (upIdx > size - 1) {
            upIdx -= size;
            console.log('Upindex', upIdx)
            colData.unshift(cells[upIdx]);
        }
        let downIdx = idx;
        while (downIdx < size * size - size) { // 3*3 - 3 - 1
            downIdx += size
            console.log('DownIndex', downIdx)
            colData.push(cells[downIdx]);
        }
        if (colData.every(value => value === currentPlayer) && colData.length === size) {
            console.log('2 case')
            setWinner(currentPlayer);
        }
        //
        upIdx = idx;
        downIdx = idx;
        colData = [cells[idx]];
        while (upIdx > size - 1) {
            upIdx -= size + 1;
            console.log('Upindex 45', upIdx)
            colData.unshift(cells[upIdx]);
        }
        while (downIdx < size * size - size - 1) { // 3*3 - 3 - 1
            downIdx += size + 1
            console.log('DownIndex 45', downIdx)
            colData.push(cells[downIdx]);
        }
        console.log(colData)
        if (colData.every(value => value === currentPlayer) && colData.length === size) {
            console.log('3 case')
            setWinner(currentPlayer);
        }

        upIdx = idx;
        downIdx = idx;
        colData = [cells[idx]];
        while (upIdx > size - 1) {
            upIdx -= size - 1;
            console.log('Upindex -45', upIdx)
            colData.unshift(cells[upIdx]);
        }
        while (downIdx < size * size - size - 1) { // 3*3 - 3 - 1
            downIdx += size - 1
            console.log('DownIndex -45', downIdx)
            colData.push(cells[downIdx]);
        }
        console.log(colData)
        if (colData.every(value => value === currentPlayer) && colData.length === size) {
            console.log('4 case')
            setWinner(currentPlayer);
        }

        !winner && whoSNext();
    }

    function whoSNext() {
        const cellsSelectedNumber = cells.filter(cell => !cell).length;
        const nextPlayer = cellsSelectedNumber % 2 === 0 ? 'X' : 'O';
        setCurrentPlayer(nextPlayer);
    }

    return (<>
            <div className={winner ? styles.table + ' ' + styles.winner : styles.table}>
                {cells.map((cell, index) => {
                    return <Cell idx={index} content={cell} cellClickHandler={cellClickHandler} size={boardSize}/>
                })}
            </div>
            {
                winner && <div> The winner is {cells[currentCell]}</div>
            }
        </>
    );
};

export default GameTable;
