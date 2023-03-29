import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    size: 3,
    cells: Array(3).fill(Array(3).fill({value: '', isHighlighted: false})),
    currentCell: [],
    currentPlayer: '',
    winner: ''
}

export const cellsSlice = createSlice({
    name: 'board',
    initialState: initialState,
    reducers: {
        setSize: (state, action) => {
            state.size = action.payload;
        },
        createCells: (state, action) => {
            state.cells = Array(action.payload.size).fill(Array(action.payload.size).fill({
                value: '',
                isHighlighted: false
            }));
        },
        updateCells: (state, action) => {
            state.cells = state.cells.map((row, i) => {
                if (action.payload.rowIndex === i) {
                    return row.map((cell, idx) => {
                        if (!cell.value && idx === action.payload.cellIndex) {
                            return {...cell, value: state.currentPlayer}
                        }
                        return cell;
                    })
                }
                return row;
            })
        },
        highlightHorizontalLine: (state, action) => {
            state.cells = state.cells.map((row, i) => {
                if (action.payload.rowIdx === i) {
                    return row.map((cell) => {
                        return {...cell, isHighlighted: true}
                    })
                }
                return row;
            });
        },
        highlightVerticalLine: (state, action) => {
            state.cells = state.cells.map((row) => {
                return row.map((cell, i) => {
                    if (action.payload.columnIdx === i) {
                        return {...cell, isHighlighted: true}
                    }
                    return cell
                })
            });
        },
        highlightDiagonalByIncrement: (state) => {
            state.cells = state.cells.map((row, rowIdx) => {
                return row.map((cell, cellIdx) => {
                    if (rowIdx === cellIdx) {
                        return {...cell, isHighlighted: true}
                    }
                    return cell;
                })
            })
        },
        highlightDiagonalByDecrement: (state) => {
            state.cells = state.cells.map((row, rowIdx) => {
                return row.map((cell, cellIdx) => {
                    if (state.size - 1 - cellIdx === rowIdx) {
                        return {...cell, isHighlighted: true}
                    }
                    return cell;
                })
            })

        },
        setCurrentPlayer: (state, action) => {
            state.currentPlayer = action.payload.currentPlayer
        },
        setCurrentCell: (state, action) => {
            state.currentCell = action.payload;
        },
        setWinner: (state, action) => {
            state.winner = action.payload;
        }
    }
})

export const {
    setSize,
    createCells,
    updateCells,
    setCurrentPlayer,
    setCurrentCell,
    highlightHorizontalLine,
    highlightVerticalLine,
    highlightDiagonalByIncrement,
    highlightDiagonalByDecrement,
    setWinner
} = cellsSlice.actions;

export default cellsSlice.reducer;
