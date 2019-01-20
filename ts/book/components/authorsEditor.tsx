import { connect, FormikContext } from "formik";
import * as React from "react";
import "../../../scss/modules/_author-editor.scss";
import ControlGroup from "../../basicComponents/control-group";
import Input from "../../basicComponents/input";
import { Book } from "../../booksStore/types";
import uniqueID from "../../utils/uniqueID";

interface IProps {
    formik: FormikContext<Book>;
}

class AuthorEditor extends React.PureComponent<IProps, {}> {
    public render() {
        const authors = this.props.formik.values.authors;
        return (
            <div className="author-editor">
                <ControlGroup
                    label="Авторы"
                    name={"authors"}
                >
                    {authors.map((author, index) => (
                        <div className="author-editor__item" key={author.id}>
                            <Input
                                label="Имя"
                                name={`authors[${index}].firstName`}
                            />
                            <Input
                                label="Фамилия"
                                name={`authors[${index}].lastName`}
                            />
                            <button
                                onClick={this.removeAuthor}
                                data-id={author.id}
                                type="button"
                                className="button"
                            >
                                Удалить
                            </button>
                        </div>
                    ))}
                </ControlGroup>
                <button type="button" className="button" onClick={this.addAuthor}>Добавить автора</button>
            </div >
        );
    }

    private removeAuthor = (event: React.MouseEvent<HTMLButtonElement>) => {
        const authors = this.props.formik.values.authors;
        const id = event.currentTarget.dataset.id;
        const newAuthors = authors.filter((author) => author.id !== id);
        this.props.formik.setFieldValue("authors", newAuthors);
    }

    private addAuthor = () => {
        const fields = [...this.props.formik.values.authors, { firstName: "", lastName: "", id: uniqueID() }];
        this.props.formik.setFieldValue("authors", fields);
    }
}

export default connect<{}>(AuthorEditor);
