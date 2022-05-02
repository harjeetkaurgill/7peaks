import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bookmarks: localStorage.getItem('bookmarks')
        ? JSON.parse(localStorage.getItem('bookmarks'))
        : []
};

// Slice
const bookmarkSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        handlingBookmarks: (state, action) => {
            state.bookmarks = action.payload;
            localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
        },
    },
});
export default bookmarkSlice.reducer;

// Actions generated from the slice.
const { handlingBookmarks } = bookmarkSlice.actions;

export const handleBookmarks = (bookmarksList, element, via) => async dispatch => {
    try {
        var updatedBookmarks = [...bookmarksList];
        if (via === "add") {
            updatedBookmarks.push(element);
        } else {
            const index = updatedBookmarks.indexOf(element);
            if (index > -1) {
                updatedBookmarks.splice(index, 1);
            }
        }
        return dispatch(handlingBookmarks(updatedBookmarks));
    } catch (e) {
        return console.error(e.message);
    }
}