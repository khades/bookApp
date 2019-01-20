import * as actions from "./actions";
import { Book, sortTypes } from "./types";

export const save = (book: Book): actions.ISaveAction => ({
    payload: { book },
    type: actions.actionTypes.SAVE,
});

export const remove = (bookID: string): actions.IRemoveAction => ({
    payload: { bookID },
    type: actions.actionTypes.REMOVE,
});

export const setSortBy = (sortType: sortTypes): actions.ISetSortingTypeAction => ({
    payload: { sortType },
    type: actions.actionTypes.SETSORTINGTYPE,
});

export const sortByTitleAsc: actions.ISetSortingTypeAction = {
    payload: { sortType: sortTypes.TITLEASC },
    type: actions.actionTypes.SETSORTINGTYPE,
};

export const sortByTitleDesc: actions.ISetSortingTypeAction = {
    payload: { sortType: sortTypes.TITLEDESC },
    type: actions.actionTypes.SETSORTINGTYPE,
};

export const sortByYearAsc: actions.ISetSortingTypeAction = {
    payload: { sortType: sortTypes.YEARASC },
    type: actions.actionTypes.SETSORTINGTYPE,
};

export const sortByYearDesc: actions.ISetSortingTypeAction = {
    payload: { sortType: sortTypes.YEARDESC },
    type: actions.actionTypes.SETSORTINGTYPE,
};
