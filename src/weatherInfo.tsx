import React from "react";

export default class WeatherInfo extends React.Component<any, any> {

    constructor(props) {
        super(props);

        this.state = {
            name : '',
            description : '',
            temp : '',
            date : {
                hour : null,
                min : null,
                sec : null,
            },
            curPos : {
                latitude : 37.532600,
                longitude : 127.024612
            }
        }

            this.fetchWeather().then(r => console.log(r));
    }

    async fetchWeather() {
        const apiKey = '268ce708189cffd8d95c4ee5cd7d086e'

        await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.curPos.latitude}&lon=${this.state.curPos.longitude}&APPID=${apiKey}`)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                this.setState({
                    name: json.name,
                    description: json.weather[0].description,
                    temp: json.main.temp
                })
            })
    }

    addZeroLowerThenTen(time : number) : string {
        return time < 10 ? `0${time}` : `${time}`
    }

    render() {
        setTimeout(()=> {
            this.setState({
                date : {
                    hour : new Date().getHours(),
                    min : new Date().getMinutes(),
                    sec : new Date().getSeconds(),
                }
            })
        },1000)
        const {name,description,temp} = this.state;
        return(
            <div>
                <h3>
                    <span role={"img"} aria-label={"Love Emoji"}>😎</span>
                    location : {name}
                </h3>
                <h3>
                    <span role={"img"} aria-label={"Baseball Emoji"}>⚾</span>
                    weather : {description}
                </h3>
                <h3>
                    <span role={"img"} aria-label={"Temperature Emoji"}>🌤</span>
                    temperature : {temp}
                </h3>
                <h3>
                    <span role={'img'} aria-label={"Clock"}>⌚</span>
                    Current Time :
                    {this.addZeroLowerThenTen(this.state.date.hour)}:
                    {this.addZeroLowerThenTen(this.state.date.min)}:
                    {this.addZeroLowerThenTen(this.state.date.sec)}
                </h3>
            </div>
        )
    }
}