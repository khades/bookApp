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
import reducers from "./reducers";
import * as routes from "./routes";

const createStoreWithMiddleware = applyMiddleware(
    save(),
)(createStore);

const store = createStoreWithMiddleware(
    reducers,
    load(),
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
