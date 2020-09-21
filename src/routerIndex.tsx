import React from "react";
import {Router,Route} from "react-router-dom";
import App from "./App";
import Register from "./Register";
import Home from "./Home";
import {history} from "./history";
import ChangeUserName from "./ChangeUserName";


function RouterIndex() {
    return (
        <Router history={history}>
            <Route path={"/home"} exact component={Home}/>
            <Route path={"/"} exact component={App}/>
            <Route path={"/register"} exact component={Register}/>
            <Route path={"/changeUserName"} exact component={ChangeUserName}/>
        </Router>
    )
}
export default RouterIndex