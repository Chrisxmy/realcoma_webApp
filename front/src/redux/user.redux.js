import {Toast} from 'antd-mobile'
import axios from 'axios'
import {request} from '../api/request.js'

const ERROR_MSG = 'ERROR_MSG'
const IS_AUTH = 'IS_AUTH'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'

const initState = {
    redirectTo: '',
    msg: '',
    username: '',
    password: '',
    type: ''
}


function getRedirectPath({type, avatar}) {
    let url = (type === 'boss') ? '/boss' : '/genius'
    if (!avatar) url += 'Info'
    console.log(url)
    return url
}

export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload, password: ''}
        case IS_AUTH:
            return {...state, msg: '', ...action.payload}
        case ERROR_MSG:
            return {...state, msg: action.msg}
        case LOGOUT:
            return {...initState, redirectTo: ''}
        default:
            return state
    }
}

function AuthSuccess(data) {
    const {password, ...obj} = data
    return {
        type: AUTH_SUCCESS, payload: obj
    }
}


function errorMsg(msg) {
    Toast.fail(msg, 1)
    return {msg, type: ERROR_MSG}
}

export function register({username, password, repeatPassword, type}) {
    if (!username || !password || !repeatPassword) {
        return errorMsg('用户名密码必须输入')
    }
    if (password !== repeatPassword) {
        return errorMsg('密码和确认密码不同')
    }
    return dispatch => {
        axios.post('/register', {username, password, type})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(AuthSuccess({username, password, type}))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}


export function loginInfo(user) {
    return {type: IS_AUTH, payload: user}
}


export function login({username, password}) {
    if (!username || !password) {
        return errorMsg('用户名密码必须输入')
    }
    return dispatch => {
        request({
            url: '/login',
            data: {
                username,
                password
            }
        }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(AuthSuccess(res.data))
            } else {
                dispatch(errorMsg(res.message))
            }
        }).catch(err => {
            dispatch(errorMsg(err.response.data.message))
        })

    }
}

export function update(data) {
    const {password, ...obj} = data
    return dispatch => {
        axios.post('/user/update', obj)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(AuthSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function logout() {
    return {type: 'LOGOUT'}
}
