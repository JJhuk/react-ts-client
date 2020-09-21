import React from "react";
import {history} from "./history";
import {config} from "./config";

type PropsType = {

}

type StateType = {
    changeUsername : string,
    password : string,
    userID : string,
    resultMessage : string,
}



export default class ChangeUserName extends React.Component<PropsType, StateType> {
    constructor(props) {
        super(props);
        this.state = {
            changeUsername: '',
            password: '',
            userID: JSON.parse(localStorage.getItem('user') as string).id,
            resultMessage: '',
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.changeUserData = this.changeUserData.bind(this)
        this.submit = this.submit.bind(this)
    }

    async changeUserData() {
        console.log("changeUserData() called")
        const {changeUsername, password, userID} = this.state;
        let user = JSON.parse(localStorage.getItem('user') as string)

        const res = await fetch(`${config.apiUrl}/users/${userID}`, {
            method: 'PUT',
            headers:  {
                'Authorization': 'Bearer ' + user.token,
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({userName : changeUsername, email : user.email, password : password})
        })
        if (!res.ok){
            const message = await res.text();
            this.setState({
                resultMessage : message
            })
        }
        this.setState({
            resultMessage : "이름 변경이 완료되었습니다."
        })
    }

    handleUsernameChange(event) {
        this.setState({
            changeUsername : event.target.value
        })
    }

    handlePasswordChange(event) {
        this.setState({
            password : event.target.value
        })
    }

    submit() {
        this.changeUserData().then(r => console.log(r))
    }

    goHomePage() {
        history.goBack()
    }

    render() {
        const {resultMessage} = this.state;
        return (
            <div>
                <div>
                    변경할 이름을 적어주세여 : <input type={"text"} className={"input-change-username"} onChange={this.handleUsernameChange}/>
                </div>
                <div>
                    기존 비밀번호를 입력해주세여 : <input type={"password"} className={"input-password"} onChange={this.handlePasswordChange}/>
                </div>
                <div>
                    <button onClick={this.submit}> changeUsername </button>
                    <button onClick={this.goHomePage}> go back home </button>
                </div>
                <div>
                    <h4 className={"result-field"}>{resultMessage}</h4>
                </div>
            </div>
        )
    }
}