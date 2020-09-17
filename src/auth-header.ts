export function authHeader(): {} {
    let user = JSON.parse(localStorage.getItem('user') as string)
    if (user && user.token) {
        return {'Authorization': 'Bearer ' + user.token}
    } else {
        return {};
    }
}