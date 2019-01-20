import { Action, actionTypes } from "./actions";
import { Book, sortTypes } from "./types";

export interface BooksState {
    items: Book[];
    sortType: sortTypes;
}

const initialState: BooksState = {
    items: [],
    sortType: sortTypes.TITLEASC,
};

const reducer = (state: BooksState = initialState, action: Action): BooksState => {
    switch (action.type) {
        case actionTypes.SAVE:
            const isUpdate = state.items.some((book) => book.id === action.payload.book.id);
            if (!isUpdate) {
                return Object.assign({}, state, {
                    items: [...state.items, action.payload.book],
                });
            }
            const newBooks = state.items.map((oldBook) => {
                if (oldBook.id !== action.payload.book.id) {
                    return oldBook;
                }
                return action.payload.book;
            });
            return Object.assign({}, state, {
                items: newBooks,
            });
        case actionTypes.REMOVE:
            const filteredBooks = state.items.filter((book) => book.id !== action.payload.bookID);
            return Object.assign({}, state, {
                items: filteredBooks,
            });
        case actionTypes.SETSORTINGTYPE:
            return Object.assign({}, state, { sortType: action.payload.sortType });
        default:
            return state;
    }
};

export default reducer;
