import {configureStore} from '@reduxjs/toolkit';

import cellsReducer from './features/gameTable/gameTableSlice';

export const store = configureStore({
    reducer: {
        board: cellsReducer
    }
})
