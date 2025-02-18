import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: 1,
    itemsPerPage: 8,
}

const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setCurrentPage: (state,action) => {
            state.currentPage = action.payload;
        },
        setItemsPerPage: (state,action) => {
            state.itemsPerPage = action.payload;
        },
    },
});

//Selectors
export const getCurrentPage = (state) => state.pagination.actions;
export const getItemsPerPage = (state) => state.pagination.actions;
export const { setCurrentPage, setItemsPerPage } = paginationSlice.actions;

export default paginationSlice.reducer;