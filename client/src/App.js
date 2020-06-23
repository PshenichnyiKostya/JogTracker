import React from 'react';
import Copyright from "./components/Copyright";
import useRoutes from "./routes";
import {BrowserRouter} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import MenuAppBar from "./components/MenuAppBar";

function App() {

    const {token, login, logout, userId} = useAuth()
    const routes = useRoutes(userId)

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId
        }
        }>
            <BrowserRouter>
                {userId && <MenuAppBar/>}
                {routes}
                <Copyright/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
