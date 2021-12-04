
export function storeToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
}

export function getToken(){
    const myToken = JSON.parse(localStorage.getItem('token'))
    return myToken;
}

export function clearCurrentToken(){
    localStorage.removeItem('token');
}

/*username*/

export function storeUserName(username) {
    localStorage.setItem('username', JSON.stringify(username));
}

export function getUserName(){
    const myUserName = JSON.parse(localStorage.getItem('username'))
    return myUserName;
}

export function clearUserName(){
    localStorage.removeItem('username');
}

/*StoreUser*/

export function storeUserId(id) {
    localStorage.setItem('id', JSON.stringify(id));
}

export function getUserId(){
    const myUserId = JSON.parse(localStorage.getItem('id'))
    return myUserId;
}

export function clearUserId(){
    localStorage.removeItem('id');
}

