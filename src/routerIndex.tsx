import React from "react";
import {HashRouter,Route} from "react-router-dom";
import App from "./App";
import Register from "./Register";


function RouterIndex() {
    return (
        <HashRouter>
            <Route path={"/"} exact={true} component={App}/>
            <Route path={"/register"} component={Register}/>
        </HashRouter>
    )
}
export default RouterIndex