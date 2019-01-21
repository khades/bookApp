import "core-js/es6/promise";
import "core-js/modules/es6.array.find";
import "core-js/modules/es6.array.from";
import "core-js/modules/es6.map";
import "core-js/modules/es6.object.assign";
import "core-js/modules/es6.set";
import "core-js/modules/es6.string.starts-with";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { HashRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { load, save } from "redux-localstorage-simple";
import "../scss/index.scss";
import "../scss/modules/_site.scss";
import Book from "./book/container";
import Books from "./books/container";
import reducers, { IStore } from "./reducers";
import * as routes from "./routes";

const createStoreWithMiddleware = applyMiddleware(
    save(),
)(createStore);

let initialValues: IStore = load() as IStore;

// localStorage cant handle Date object, so we force-convert strings to objects in date fields
initialValues = {
    Books: Object.assign(
        {},
        initialValues.Books,
        {
            items: initialValues.Books.items.map((book) => {
                if (typeof book.printingDate === "string") {
                    return Object.assign(
                        {},
                        book,
                        { printingDate: new Date(Date.parse(book.printingDate)) },
                    );
                }
                return book;
            }),
        },
    ),
};

const store = createStoreWithMiddleware(
    reducers,
    initialValues,
);

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <div className="site">
                <div className="site__content">
                    <Switch>
                        <Route exact={true} path={routes.Books} component={Books} />
                        <Route exact={true} path={routes.Book} component={Book} />
                        <Redirect to={routes.Books} />
                    </Switch>
                </div>
            </div>
        </HashRouter>
    </Provider>

), document.getElementById("main"));
