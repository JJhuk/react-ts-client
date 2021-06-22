import data from './secrets/credentials.json'

export const config = {
    apiUrl: 'http://localhost:5000',
    cityAPIKey: data.openWeatherMapInfoKey,
    weatherAPI : 'api.openweathermap.org/data/2.5/weather?id=2643743&appid=',
}