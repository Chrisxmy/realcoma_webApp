import axios from 'axios'
import qs from 'qs'
import { Toast } from 'antd-mobile'

axios.interceptors.request.use(function(config){
    Toast.loading('加载中',0)
    return config
})

axios.interceptors.response.use(function(config){
        Toast.hide()
})



axios.interceptors.request.use(config => {
    if(JSON.parse(localStorage.getItem('userInfo'))){
        const token = 'auth ' + JSON.parse(localStorage.getItem('userInfo')).token;
        if (token) {
            config.headers.Authorization = token;
        }
    }
    return config
}, error => {
    return Promise.reject(error)
})


axios.interceptors.response.use(response => {

    return response
}, error => {
    if(error.response && error.response.status === 401) {

    }

    return Promise.resolve(error.response)
})

function errorState(response) {
}

function successState(res) {

}

const baseURL = '/api'


const Axios = (opts) => {

    let Public = { //公共参数
    }
    let httpDefaultOpts = { //http默认配置
        method:opts.method || 'get',
        url: opts.url,
        timeout: 10000,
        params:opts.params,
        data:qs.stringify(opts.data),
        headers: opts.method=='get'?{
            'X-Requested-With': 'XMLHttpRequest',
            "Accept": "application/json",
            "Content-Type": "application/json; charset=UTF-8"
        }:{
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }

    if(httpDefaultOpts.method=='get'){
        delete httpDefaultOpts.data
    }else{
        delete httpDefaultOpts.params
    }

    if(httpDefaultOpts.method=='patch'){
      httpDefaultOpts.data = opts.data
    }



    let promise = new Promise(function(resolve, reject) {
        axios(httpDefaultOpts).then(
            (res) => {
                resolve(res.data)
            }
        ).catch(
            (response) => {
                reject(response)
            }
        )

    })
    return promise
}


export default Axios