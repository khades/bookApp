import { Form, Formik, FormikActions } from "formik";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import "../../scss/modules/_book.scss";
import DatePicker from "../basicComponents/datePicker";
import ImageUploader from "../basicComponents/imageUploader";
import Input from "../basicComponents/input";
import NumericInput from "../basicComponents/numericInput";
import { BookSchema } from "../booksStore/schemas";
import { Book } from "../booksStore/types";
import * as routes from "../routes";
import uniqueID from "../utils/uniqueID";
import AuthorEditor from "./components/authorsEditor";

export interface IOwnProps extends RouteComponentProps<{ id: string }> { }

export interface IStateProps {
    book?: Book;
    found: boolean;
    isNew: boolean;
}

export interface IDispatchProps {
    save: (book: Book) => void;
}

export interface IProps extends IOwnProps, IStateProps, IDispatchProps { }

export default class BookComponent extends React.PureComponent<IProps> {
    public render() {
        if (!this.props.book) {
            return (
                <div>
                    Книга не найдена
                </div>
            );
        }

        return (
            <div className="book">
                {this.props.isNew && (<div className="book__header">Создание книги</div>)}
                {!this.props.isNew && (<div className="book__header">Редактирование книги</div>)}
                <Formik
                    initialValues={this.props.book}
                    isInitialValid={true}
                    validationSchema={BookSchema}
                    onSubmit={this.onSubmit}
                >
                    {({ isValid }) => (
                        <Form>
                            <Input name="title" label="Заголовок" />
                            <AuthorEditor />
                            <NumericInput name="pages" label="Количество страниц" />
                            <Input name="publisher" label="Название издательства" />
                            <NumericInput name="yearOfPublish" label="Год публикации" />
                            <DatePicker name="printingDate" label="Дата выхода в тираж" />
                            <Input name="ISBN" label="ISBN" />
                            <ImageUploader name="image" label="Изображение" />
                            <button
                                className="button"
                                type="submit"
                                disabled={!isValid}
                            >
                                Сохранить
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }

    private onSubmit = (book: Book, actions: FormikActions<Book>) => {
        if (this.props.isNew) {
            book.id = uniqueID();
            this.props.save(book);
            this.props.history.push(routes.toBook(book.id));
        } else {
            this.props.save(book);
        }
        actions.setSubmitting(false);
    }
}
