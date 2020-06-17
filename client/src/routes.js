import React from "react";
import JogsPage from "./pages/JogsPage";
import {Redirect, Route, Switch} from "react-router-dom";
import AuthPage from "./pages/AuthPage";

const useRoutes = (userId) => {
    if (userId) {
        return (
            <Switch>
                <Route path='/jogs' exact>
                    <JogsPage/>
                </Route>
                <Redirect to='/jogs'/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/' exact>
                <AuthPage/>
            </Route>
            <Redirect to='/'/>
        </Switch>
    )
};

export default useRoutes
