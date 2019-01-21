import * as React from "react";
import { Link } from "react-router-dom";
import "../../scss/modules/_books.scss";
import { BooksState } from "../booksStore/reducer";
import { sortTypes } from "../booksStore/types";
import * as routes from "../routes";

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
                {this.generateTableHeader()}
                {this.props.items.map((book) => (
                    <div className="books__item" key={book.id} >
                        <Link className="books__title" to={routes.toBook(book.id)}>{book.title}</Link>
                        <Link className="books__year" to={routes.toBook(book.id)}>{book.yearOfPublish} </Link>
                        <button type="button" className="button" data-id={book.id} onClick={this.removeBook}>Удалить</button>
                    </div>
                ))}

            </div>
        );
    }

    // Preventing creation of many functions by binding data from dataset
    private removeBook = (event: React.MouseEvent<HTMLButtonElement>): void => {
        this.props.removeBook(event.currentTarget.dataset.id);
    }

    private generateTableHeader = () => {
        if (this.props.sortType === sortTypes.TITLEASC) {
            return (
                <div className="books__table-header">
                    <div className="books__title" onClick={this.onTitleClick}><b>Заголовок ▼</b></div>
                    <div className="books__year" onClick={this.onYearClick}>Год</div>
                </div>
            );
        }
        if (this.props.sortType === sortTypes.TITLEDESC) {
            return (
                <div className="books__table-header">
                    <div className="books__title" onClick={this.onTitleClick}><b>Заголовок ▲</b></div>
                    <div className="books__year" onClick={this.onYearClick}>Год</div>
                </div>
            );
        }
        if (this.props.sortType === sortTypes.YEARASC) {
            return (
                <div className="books__table-header">
                    <div className="books__title" onClick={this.onTitleClick}>Заголовок</div>
                    <div className="books__year" onClick={this.onYearClick}><b>Год ▼</b></div>
                </div>
            );
        }
        return (
            <div className="books__table-header">
                <div className="books__title" onClick={this.onTitleClick}>Заголовок</div>
                <div className="books__year" onClick={this.onYearClick}><b>Год ▲</b></div>
            </div>
        );
    }

    private onTitleClick = () => {
        if (this.props.sortType === sortTypes.TITLEASC) {
            this.props.sortByTitleDesc();
        } else {
            this.props.sortByTitleAsc();

        }
    }

    private onYearClick = () => {
        if (this.props.sortType === sortTypes.YEARASC) {
            this.props.sortByYearDesc();
        } else {
            this.props.sortByYearAsc();
        }
    }
}
