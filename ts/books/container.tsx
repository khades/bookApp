import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../booksStore/actioncreators";
import { IStore } from "../reducers";
import Component, { IDispatchProps, IStateProps } from "./component";
import * as selectors from "./selectors";

// Component has no own props and component has all data from store to consume
const mapStateToProps = (store: IStore): IStateProps => ({
    items: selectors.getSortedBooks(store),
    sortType: store.Books.sortType,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
    removeBook: (bookID: string) => dispatch(actions.remove(bookID)),
    // setSortBy: (sortType: sortTypes) => dispatch(actions.setSortBy(sortType))
    sortByTitleAsc: () => dispatch(actions.sortByTitleAsc),
    sortByTitleDesc: () => dispatch(actions.sortByTitleDesc),
    sortByYearAsc: () => dispatch(actions.sortByYearAsc),
    sortByYearDesc: () => dispatch(actions.sortByYearDesc),

});

const Books = connect<IStateProps, IDispatchProps, {}>(
    mapStateToProps,
    mapDispatchToProps,
)(Component);

export default Books;
