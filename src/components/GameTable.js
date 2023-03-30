import React, {useEffect} from 'react';
import styled from 'styled-components';
import Cell from "./Cell";
import {useSelector, useDispatch} from "react-redux";
import {
    highlightDiagonalByDecrement,
    highlightDiagonalByIncrement,
    highlightHorizontalLine,
    highlightVerticalLine, setCurrentCell,
    setCurrentPlayer, setWinner,
    updateCells
} from '../store/features/gameTable/gameTableSlice';


const GameTableStyled = styled.div`
  width: calc(60vmin);
  height: calc(60vmin);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.winner ? 0.2 : 1};
  gap: ${props => (props.boardSize + 1) * 0.1}rem;
  

        @media(max-width: 1100px) {
        width: 70vmin;
        height: 70vmin;
  }
  
    @media(max-width: 768px) {
        width: 90vw;
        height: 90vw;
  }
      @media(max-width: 512px) {
        width: 90vw;
        height: 90vw;
  }
`;

const GameTable = ({winner, boardSize}) => {
    const cells = useSelector((state) => state.board.cells);
    const currentPlayer = useSelector((state) => state.board.currentPlayer);
    const currentCell = useSelector((state) => state.board.currentCell);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('rerender the table')
        checkBoard(currentCell, boardSize);
    }, [cells]);


    function cellClickHandler(rowIndex, cellIndex) {
        if (!winner) {   // block the board
            dispatch(setCurrentCell([rowIndex, cellIndex]));
            dispatch(updateCells({rowIndex, cellIndex}));
        }
    }

    function checkBoard(coords, boardSize) {
        // fallback to draw
        if (!winner && cells.flat().every(cell => cell.value)) {
            dispatch(setWinner('-'));
        }
        // check horizontal line "—"
        if (cells[coords[0]] && cells[coords[0]].every(cell => cell.value === currentPlayer)) {
            dispatch(highlightHorizontalLine({rowIdx: coords[0]}));
            dispatch(setWinner(currentPlayer));
        }

        // check vertical line "|"
        if (cells.map((row) => row.filter((cell, i) => i === coords[1])).every(cell => cell[0] && cell[0].value === currentPlayer)) {
            dispatch(highlightVerticalLine({columnIdx: coords[1]}))
            dispatch(setWinner(currentPlayer));
        }

        // find whether we the move is in diagonal "\"
        if (coords[0] === coords[1]) { //check to prevent surplus loop
            if (cells.map((row, k) => row.filter((cell, i) => i === k)).every(cell => cell[0].value && cell[0].value === currentPlayer)) {
                dispatch(highlightDiagonalByIncrement());
                dispatch(setWinner(currentPlayer));
            }
        }

        // find whether we the move is in diagonal "/"
        if (boardSize - coords[0] - 1 === coords[1]) {  //check to prevent surplus loop
            if (cells.map((row, k) => row.filter((cell, i) => boardSize - 1 - i === k)).every(cell => cell[0].value === currentPlayer)) {
                dispatch(highlightDiagonalByDecrement());
                dispatch(setWinner(currentPlayer));
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
        dispatch(setCurrentPlayer({currentPlayer: nextPlayer}))
    }

    return (
        <>
            <GameTableStyled
                winner={winner}
                boardSize={boardSize}>
                {cells.map((row, rowIndex) => {
                    return row.map((cell, cellIndex) => (
                        <Cell key={rowIndex.toString() + cellIndex.toString()}
                              rowIdx={rowIndex}
                              cellIdx={cellIndex}
                              content={cell.value}
                              cellClickHandler={cellClickHandler}
                              size={boardSize}
                              isSelected={cell.isHighlighted}
                              currentPlayer={currentPlayer}
                              winner={winner}
                        />
                    ))
                })}
            </GameTableStyled>
        </>);
};

export default GameTable;
