import { IStore } from "../reducers";
import { Book, sortTypes } from "./types";

export const getBooks = (store: IStore): Book[] => store.Books.items;
export const getBooksSortOrder = (store: IStore): sortTypes => store.Books.sortType;
