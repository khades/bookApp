
import { combineReducers } from "redux";

import { Action as BooksAction } from "./booksStore/actions";
import Books, { BooksState } from "./booksStore/reducer";

export interface IStore {
    readonly Books: BooksState;
}

type actions = BooksAction;

export default combineReducers<IStore, actions>({
    Books,
});
