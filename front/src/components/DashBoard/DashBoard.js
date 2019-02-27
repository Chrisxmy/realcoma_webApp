import React from 'react'
import { NavBar } from 'antd-mobile';
import { connect } from 'react-redux'
import {Route,Switch} from 'react-router-dom'
import NavLinkBar from '../../components/NavLinkBar/NavLinkBar'
import Boss from '../../components/boss/boss'
import Genius from '../../components/genius/genius'
import Personal from '../../components/personal/personal'
import Msg from '../../components/msg/msg'
import { receiveMsg ,offMsg} from "../../redux/chat.redux";


@connect(
    state=>state, { receiveMsg, offMsg}
)
class DashBoard extends React.Component{
    componentDidMount(){
        this.props.receiveMsg()
    }
    componentWillUnmount() {
        offMsg()
    }
    render() {
        const user = this.props.user
        const {pathname} = this.props.location
        const navList = [
            {
                path:'/boss',
                text:'genius',
                icon:'list',
                title:'genius列表',
                components:Boss,
                hide:user.type === 'genius'
            },
            {
                path:'/genius',
                text:'boss',
                icon:'list',
                title:'Boss列表',
                components:Genius,
                hide:user.type === 'boss'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'message',
                title:'消息列表',
                components:Msg,
            },
            {
                path:'/me',
                text:'我',
                icon:'wo',
                title:'个人中心',
                components:Personal,
            }
        ]
        const nav = navList.find(v=>v.path === pathname)
        const title = nav && nav.title
        return (
            <div style={{display:'flex',flexDirection:'column',minHeight:'100vh'}}>
                <NavBar style={{position:'fixed',top:0,right:0,left:0,background:'linear-gradient(to right, #4a00e0, #8e2de2)', color:'#fff'}} mode="dark">{title}</NavBar>
                <div style={{flex:'auto',marginTop:45}}>
                    <Switch>
                        {
                            navList.map(v=>(
                                <Route key={v.path} path={v.path} component={v.components}></Route>
                            ))
                        }
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default DashBoard