import React from "react";

export default class WeatherInfo extends React.Component<any, any> {

    handleResponse(response : any) : Promise<any> {
        console.log('hello')
        return new Promise(((resolve, reject) => {
            if(response.ok) {
                console.log(response.json())
            } else {
                response.text().then((text : any) => reject(text))
            }
        }))
    }

    handleError({error}: { error: any } ) {
        console.log(error)
        return Promise.reject(error & error.message);
    }

    constructor(props) {
        super(props);

        this.state = {
            name : '',
            description : '',
            temp : ''
        }

        const apiKey ='268ce708189cffd8d95c4ee5cd7d086e'


        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${35}&lon=${139}&APPID=${apiKey}`)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                this.setState({name : json.name, description : json.weather[0].description, temp : json.main.temp})
            })
    }

    render() {
        const {name,description,temp} = this.state;
        return(
            <div>
                <h3>location : {name}</h3>
                <h3>weather : {description}</h3>
                <h3>temperature : {temp}</h3>
            </div>
        )
    }
}