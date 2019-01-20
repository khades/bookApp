import { createSelector } from "reselect";
import { getBooks } from "../booksStore/selectors";
import { Book, sortTypes } from "../booksStore/types";
import { IStore } from "../reducers";
import { IOwnProps } from "./component";
import { IStateProps } from "./component";

function getBook(books: Book[], bookID: string): IStateProps {
    if (bookID === "new") {
        return {
            book: {
                id: "",
                title: "",
                authors: [],
                pages: 0,
            },
            isNew: true,
            found: true,
        };
    }
    const result = books.find((book) => book.id === bookID);
    if (result) {
        return {
            book: result,
            isNew: false,
            found: true,
        };
    } else {
        return {
            isNew: false,
            found: false,
        };
    }
}

const getBookID = (store: IStore, props: IOwnProps) => props.match.params.id;

export const getBookFromStore = createSelector(
    [getBooks, getBookID],
    getBook,
);
