import React from 'react'
import {  Button,WhiteSpace } from 'antd-mobile';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import {logout} from '../../redux/user.redux.js'
import './personal.scss'

const btnStyle = {
    background:'#fff',color:'#000'
}
@connect(
    state=>state.user,{logout}
)
class Personal extends React.Component {
    constructor(props) {
        super(props)
    }
    changeInfo(){
        this.props.history.push('/info')
    }
    logout(){
        axios({
            method:'post',
            url:'/logout'
        }).then(res=>{
            if(res.data.code === 0){
                this.props.logout()
                this.props.history.push('/login')
            }
        })
    }

    render() {
        const user = this.props
        return (
            user.username ? <div className='personal'>
                <div className='header'>
                    <img src={user.avatar} alt='没有加载'></img>
                    <p>{user.username}</p>
                </div>
                    <h4>个人简介</h4>
                    <WhiteSpace></WhiteSpace>
                    <ul className='card'>
                        <li>职业：{user.title}</li>
                        <li>薪资要求：{user.salary}</li>
                        <li>技能：{user.desc && user.desc.split('\n').map(v=>(
                            <p key={v}>{v}</p>
                        ))}</li>
                    </ul>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <Button onClick={()=>{this.changeInfo()}} style={btnStyle} >修改资料</Button>
                <WhiteSpace></WhiteSpace>
                <Button onClick={()=>{this.logout()}} style={btnStyle}>退出登陆</Button>
            </div> : <Redirect to={this.props.redirectTo}/>
        )

    }
}

export default Personal