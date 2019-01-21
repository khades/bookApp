import * as React from "react";
import { Link } from "react-router-dom";
import "../../scss/modules/_books.scss";
import { BooksState } from "../booksStore/reducer";
import { Author, Book, sortTypes } from "../booksStore/types";
import * as routes from "../routes";
import BookRow from "./components/bookRow";
import TableHeader from "./components/tableHeader";

export type IStateProps = BooksState;

export interface IDispatchProps {
    removeBook: (bookID: string) => void;
    sortByTitleAsc: () => void;
    sortByTitleDesc: () => void;
    sortByYearAsc: () => void;
    sortByYearDesc: () => void;
    // setSortBy: (sortType: sortTypes) => void;
}

export interface IProps extends IStateProps, IDispatchProps { }

export default class BooksComponent extends React.PureComponent<IProps> {
    public render() {
        return (
            <div className="books">
                <div className="books__hgroup">
                    <div className="books__header">Книги</div>
                    <Link to={routes.toBook("new")}>
                        <button type="button" className="button">
                            Создать новую
                        </button>
                    </Link>
                </div>
                <div className="books__table-container">
                    <table
                        cellSpacing="0"
                        cellPadding="0"
                        className="books__table"
                    >
                        <thead>
                            <TableHeader
                                sortByTitleAsc={this.props.sortByTitleAsc}
                                sortByTitleDesc={this.props.sortByTitleDesc}
                                sortByYearAsc={this.props.sortByYearAsc}
                                sortByYearDesc={this.props.sortByYearDesc}
                                sortType={this.props.sortType}
                            />
                        </thead>
                        <tbody>
                            {this.props.items.map((item) => <BookRow
                                key={item.id}
                                book={item}
                                removeBook={this.removeBook}
                            />)}
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }

    // Preventing creation of many functions by binding data from dataset
    private removeBook = (event: React.MouseEvent<HTMLButtonElement>): void => {
        this.props.removeBook(event.currentTarget.dataset.id);
    }

}
