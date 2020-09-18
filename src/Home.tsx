import React from "react";
import {authHeader} from "./auth-header";
import {config} from "./config";
import {history} from "./history";
import WeatherInfo from "./weatherInfo";

export default class Home extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            email: '',
            userID: JSON.parse(localStorage.getItem('user') as string).id,
        }

        this.fetchData().catch(console.log)
        this.handleLogout = this.handleLogout.bind(this)
    }

    async fetchData() {
        console.log('function fetchData() called ')
        const response = await fetch(`${config.apiUrl}/users/${this.state.userID}`, {
            method: 'GET',
            headers: authHeader(),
        })
        console.log(response)
        if (!response.ok)
            throw await response.text()

        const user = await response.json()
        this.setState({...user, userID: this.state.userID})
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
                <h2 className={"weatherInfo"}><WeatherInfo/></h2>
                <button onClick={this.handleGoHome} className={"user-homeBtn"}>Go to Home</button>
                <button onClick={this.handleLogout} className={"user-logoutBtn"}>Logout</button>
            </div>
        )
    }
}
