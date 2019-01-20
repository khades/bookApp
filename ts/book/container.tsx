import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as  actions from "../booksStore/actioncreators";
import { Book } from "../booksStore/types";
import { IStore } from "../reducers";
import { IDispatchProps, IOwnProps, IStateProps } from "./component";
import Component from "./component";
import { getBookFromStore } from "./selectors";

const mapStateToProps = (store: IStore, props: IOwnProps): IStateProps => getBookFromStore(store, props);

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
    save: (book: Book) => dispatch(actions.save(book)),
});

const Book = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Component);

export default Book;
