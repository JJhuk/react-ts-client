import React from "react";
import {HashRouter,Route} from "react-router-dom";
import App from "./App";
import Register from "./Register";
import Home from "./Home";


function RouterIndex() {
    return (
        <HashRouter>
            <Route path={"/home"} exact component={Home}/>
            <Route path={"/"} exact component={App}/>
            <Route path={"/register"}  exact component={Register}/>
        </HashRouter>
    )
}
export default RouterIndex