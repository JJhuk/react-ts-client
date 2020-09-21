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
            createdDateTime: '',
            userID: JSON.parse(localStorage.getItem('user') as string).id,
            changeUsername: '',
        }

        this.getUserData().catch(console.log)
        this.handleLogout = this.handleLogout.bind(this)
    }

    async getUserData() {
        console.log('function fetchData() called ')
        const response = await fetch(`${config.apiUrl}/users/${this.state.userID}`, {
            method: 'GET',
            headers: authHeader(),
        })
        if (!response.ok)
            throw await response.text()

        const user = await response.json()
        console.log(user);
        this.setState({
            ...user,
            userID: this.state.userID,
        })
    }

    handleGoHome() {
        history.goBack()
    }

    handleLogout() {
        console.log(this.state)
        localStorage.removeItem(this.state.userID)
        history.goBack()
    }

    timeParsing(time: string): string {
        return time.substr(0, time.indexOf('T'))
    }

    handleUsernameChange = (e) => {
        history.push("changeUserName")
    }

    onChangeUsername = (event) => {
        this.setState({
            changeUsername: event.target.value
        })
    }

    render() {
        const {userName, email, createdDateTime} = this.state;
        return (
            <div>
                <div>
                    <h1 className="user-username">Hi! {userName}</h1>
                    <h4 className="user-email">Your Email is {email}</h4>
                    <h4 className={"user-create-datetime"}>Your Created time is {this.timeParsing(createdDateTime)}</h4>
                </div>
                <div>
                    <h4 className={"weatherInfo"}><WeatherInfo/></h4>
                </div>
                <div>
                    <button onClick={this.handleGoHome} className={"user-homeBtn"}>Go to Home</button>
                    <button onClick={this.handleLogout} className={"user-logoutBtn"}>Logout</button>
                    <button onClick={this.handleUsernameChange}>go to change Username</button>
                </div>
            </div>
        )
    }
}
