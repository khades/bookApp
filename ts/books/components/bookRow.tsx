import * as React from "react";
import { Link } from "react-router-dom";
import { Author, Book } from "../../booksStore/types";
import * as routes from "../../routes";

export interface IRowProps {
    book: Book;
    removeBook: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const BookRow = React.memo((props: IRowProps) => (
    <tr>
        <td>
            <div className="books__row-text">
                {props.book.title}
            </div>
        </td>

        <td >
            <div className="books__row-text">
                {props.book.authors.map((author: Author) => author.lastName + " " + author.firstName).join(", ")}
            </div>
        </td>
        <td>
            <div className="books__row-text">
                {props.book.pages}
            </div>
        </td>
        <td>
            <div className="books__row-text">
                {props.book.publisher}
            </div>
        </td>
        <td style={{ whiteSpace: "nowrap" }}>
            <div className="books__row-text">
                {props.book.yearOfPublish}
            </div>
        </td>
        <td style={{ whiteSpace: "nowrap" }}>
            <div className="books__row-text">
                {props.book.ISBN}
            </div>
        </td>
        <td>
            <Link to={routes.toBook(props.book.id)}>
                <button type="button" className="button">
                    Редактировать
                </button>
            </Link>
        </td>
        <td>
            <button data-id={props.book.id} onClick={props.removeBook} type="button" className="button">
                Удалить
            </button>
        </td>
    </tr>
));

export default BookRow;
