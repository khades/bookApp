import { Book, sortTypes } from "./types";

export enum actionTypes {
    SAVE = "BOOKS/SAVE",
    REMOVE = "BOOKS/REMOVE",
    SETSORTINGTYPE = "BOOKS/SETSORTINGTYPE",
}

export interface ISaveAction {
    type: actionTypes.SAVE;
    payload: {
        book: Book,
    };
}

export interface IRemoveAction {
    type: actionTypes.REMOVE;
    payload: {
        bookID: string,
    };
}

export interface ISetSortingTypeAction {
    type: actionTypes.SETSORTINGTYPE;
    payload: {
        sortType: sortTypes,
    };
}
export type Action = ISaveAction | IRemoveAction | ISetSortingTypeAction;
