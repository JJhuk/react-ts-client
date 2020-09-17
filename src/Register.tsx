import React from 'react'
import {createStyles, Theme, WithStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {withStyles} from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

const serverURL = 'http://localhost:5000';


const styles = (theme: Theme) =>(
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: 400,
            margin: `${theme.spacing(0)} auto`
        },
        loginBtn: {
            marginTop: theme.spacing(2),
            flexGrow: 1
        },
        registerBtn: {
            marginTop: theme.spacing(2),
            flexGrow: 1
        },
        homeBtn: {
            marginTop: theme.spacing(2),
            flexGrow: 1
        },
        header: {
            textAlign: 'center',
            background: '#212121',
            color: '#fff'
        },
        card: {
            marginTop: theme.spacing(10)
        }
    })
);

function handleResponse(response : any) : Promise<{token : string}> {
    return new Promise(((resolve, reject) => {
        if(response.ok) {
            let contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json))
            } else{
                resolve()
            }
        } else {
            console.log('not ok')
            response.text().then((text:any) => reject(text))
        }
    }))
}

function handleError({error}: { error: any } ) {
    console.log(error)
    return Promise.reject(error & error.message);
}

class Register extends React.Component<WithStyles<typeof styles>,{user}> {

    constructor(props : any) {
        super(props);

        this.state = {
            user: {
                Username: '',
                Email: '',
                Password: ''
            }
        }

        this.handleChangeUserName = this.handleChangeUserName.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.register =this.register.bind(this)
    }

    handleChangeUserName(event : any) {
        const  value  = event.target.value;

        this.setState({
            user: {
                Username : value,
                Email: this.state.user.Email,
                Password: this.state.user.Password
            }
        })
    }

    handleChangeEmail(event : any) {
        const value  = event.target.value;
        this.setState({
            user: {
                Username: this.state.user.Username,
                Email: value,
                Password: this.state.user.Password
            }
        })
    }

    handleChangePassword(event : any) {
        const value = event.target.value;
        this.setState({
            user: {
                Username: this.state.user.Username,
                Email: this.state.user.Email,
                Password: value
            }
        })
    }

    register() {
        const {user} = this.state
        console.log(JSON.stringify(user))
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        console.log(serverURL + '/users/register' + requestOptions);
        fetch(serverURL + '/users/register', requestOptions)
            .then(handleResponse,handleError)
    }


    render() {
        const {classes} = this.props;
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <Card className={classes.card}>
                    <CardHeader className={classes.header} title="Login App"/>
                    <CardContent>
                        <div>
                            <TextField
                                fullWidth
                                id="username"
                                type="username"
                                label="username"
                                placeholder="username"
                                margin="normal"
                                onChange={this.handleChangeUserName}
                            />
                            <TextField
                                fullWidth
                                id="Email"
                                type="Email"
                                label="Email"
                                placeholder="Email"
                                margin="normal"
                                onChange={this.handleChangeEmail}
                            />
                            <TextField
                                fullWidth
                                id="password"
                                type="password"
                                label="Password"
                                placeholder="Password"
                                margin="normal"
                                onChange={this.handleChangePassword}
                            />
                        </div>
                    </CardContent>
                    <CardActions>
                            <Button
                                variant="contained"
                                size="large"
                                color="secondary"
                                className={classes.registerBtn}
                                onClick={this.register}
                                disabled={false}>
                                Register
                            </Button>
                            <Link to="/">
                                <Button
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    className={classes.homeBtn}
                                    disabled={false}>
                                    Home
                                </Button>
                            </Link>
                    </CardActions>
                </Card>
            </form>
        )
    }
}


export default withStyles(styles)(Register);