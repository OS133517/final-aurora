import jwt_decode from 'jwt-decode';

export function decodeJwt(token) {

    if(token === null) return null;

    return jwt_decode(token);
}

export function getMemberCode() {

    if(window.localStorage.getItem("accessToken") === null) return null;

    return decodeJwt(window.localStorage.getItem("accessToken")).memberCode;
}