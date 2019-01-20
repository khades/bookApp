
import { createSelector } from "reselect";
import { getBooks, getBooksSortOrder } from "../booksStore/selectors";
import { Book, sortTypes } from "../booksStore/types";

function compareBooksByTitle(firstBook: Book, secondBook: Book, reverse: boolean = false) {
    let result = 0;
    const firstTitle = firstBook.title;
    const secondTitle = secondBook.title;
    if (firstTitle < secondTitle) {
        result = -1;
    }
    if (firstTitle > secondTitle) {
        result = 1;
    }
    if (reverse) {
        return -result;
    }
    return result;
}

function sortBooks(books: Book[], sortType: sortTypes): Book[] {
    switch (sortType) {
        case sortTypes.TITLEASC:
            return books.sort(compareBooksByTitle);
        case sortTypes.TITLEDESC:
            return books.sort((a, b) => compareBooksByTitle(a, b, true));
        case sortTypes.YEARASC:
            return books.sort((a, b) => a.yearOfPublish - b.yearOfPublish);
        case sortTypes.YEARDESC:
            return books.sort((a, b) => b.yearOfPublish - a.yearOfPublish);
    }
}

export const getSortedBooks = createSelector(
    [getBooks, getBooksSortOrder],
    sortBooks,
);
