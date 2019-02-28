import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {loginInfo} from '../../redux/user.redux.js'
@withRouter
@connect(
    null,
    {loginInfo}
)
class AuthRoute extends React.Component {
    goPage(route) {
        this.props.history.push(route)
    }
    usrStatus(user) {
        if(!user.avatar) {
            this.goPage('/info')
        } else {
           user.type === "genius" ? this.goPage('/genius') : this.goPage('/boss')
        }
    }
    componentDidMount() {
        const publicPage = ['/login', '/register']
        const pathname = this.props.location.pathname

        if(publicPage.includes(pathname)) return
       axios.get('/info').then((res) => {
            if(res.data.code === 0) {
                const user = res.data.data[0]
                this.props.loginInfo(user)
                this.usrStatus(user)
            } else {
                this.goPage('/login')
            }
       }).catch(() => {
           this.goPage('/login')
       })
    }

    render(){
        return (
            <div></div>
        )
    }
}

export default AuthRoute