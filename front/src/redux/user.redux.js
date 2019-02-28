import {Toast} from 'antd-mobile'
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




export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, msg: '', redirectTo: '/info', ...action.payload, password: ''}
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
        request({
            url: '/register',
            data: {username, password, type}
        })
            .then(res => {
                 dispatch(AuthSuccess({username, password, type}))
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
            dispatch(AuthSuccess(res.data))
        }).catch(err => {
            dispatch(errorMsg(err.response.data.message))
        })

    }
}

export function update(data) {
    const {password, ...obj} = data
    return dispatch => {
        request({
            url:'/user/update',
            data:obj
        }).then(res => {
               dispatch(AuthSuccess(res.data))
            })
    }
}

export function logout() {
    return {type: 'LOGOUT'}
}
