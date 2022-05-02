import { configureStore } from '@reduxjs/toolkit';
import bookmarkSlice from "./slices/bookmarks";

const store = configureStore({
    reducer: {
        bookmarks: bookmarkSlice,
    },
});

export default store;