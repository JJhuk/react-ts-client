import React from "react";
import {authHeader} from "./auth-header";
import {config} from "./config";
import {history} from "./history";

type user = {
    token?: string,
    userName?: string,
    email?: string,
}


export default class Home extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            email: '',
            userID: JSON.parse(localStorage.getItem('user') as string).id,
        }

        this.fetchData()
        this.handleLogout = this.handleLogout.bind(this)
    }

    fetchData() {

        console.log('function fetchData() called ')
        const requestOptions = {
            method: 'GET',
            headers: authHeader(),
        }
        fetch(config.apiUrl + '/users/' + this.state.userID, requestOptions)
            .then(this.handleResponse, this.handleError)
            .then(user => {
                this.setState({userName: user.userName, email: user.email, userID: this.state.userID})
            });

    }

    handleResponse(response: any): Promise<user> {
        return new Promise(((resolve, reject) => {
            if (response.ok) {
                let contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    response.json().then((json: { token: string }) => resolve(json))
                } else {
                    resolve()
                }
            } else {
                response.text().then((text: any) => reject(text))
            }
        }))
    }

    handleError({error}: { error: any }) {
        return Promise.reject(error & error.message);
    }

    handleGoHome() {
        history.goBack()
    }

    handleLogout() {
        console.log(this.state)
        localStorage.removeItem(this.state.userID)
        history.goBack()
    }

    render() {
        const {userName, email} = this.state;
        return (
            <div>
                <h1 className="user-username">Hi! {userName}</h1>
                <h4 className="user-email">Your Email is {email}</h4>
                <button onClick={this.handleGoHome} className={"user-homeBtn"}>Go to Home</button>
                <button onClick={this.handleLogout} className={"user-logoutBtn"}>Logout</button>
            </div>
        )
    }
}
