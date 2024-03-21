import axios from "axios";

const URL = 'https://wepickapp.innobing.net/'; 

//Hace el login de usuario
export const login = (email, pass) => { 
    const data = {
        user: {
            email: email,
            password: pass 
        }
    }
    return new Promise((resolve, reject) => { 
        axios.post(`${URL}login.json`, data).then(res => {
            resolve({
              info: res.data,
              token: res.headers.authorization
            });
        }).catch(err => {
            reject(err);
        })
    })
}

//Hace el registro de usuario
export const register = (email, nick, name, lastname, pass, friendlyCode) => {
    const data = {
        user: {
            role: 'user',
            email: email,
            nick: nick,
            name: name,
            lastname: lastname,
            password: pass,
            friendly_code: friendlyCode
        }
    }
    return new Promise((resolve, reject) => {
        axios.post(`${URL}signup.json`, data)
        .then(res => {
            resolve(res);
        }).catch(err => {
            console.error(err);
            reject(err);
        })
    })
}

export const nickIsAvailable = (nick) => {
  return new Promise((resolve, reject) => {
    const data = {
        nick: nick
    } 
    axios.post(`${URL}/nick_exist.json`, data)
    .then(res => {
        resolve(res.status === 200);
    }).catch(err => {
        console.error(err);
        reject(err.response.data);
    })
  }) 
}

export const validateFriendlyCode = async code => {
  return true
}

export const recoverPassword = async (password, repeatPassword) => {
  return new Promise((resolve, reject) => {
    axios.post(`${URL}recoverPassword.json`, data)
    .then(res => {
        console.log('Recover password service !!!', password, repeatPassword);
        resolve(res);
    }).catch(err => {
        console.error(err);
        reject(err);
    })
  }) 
}