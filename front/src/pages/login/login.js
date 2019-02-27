import React from 'react'
import Logo from '@/components/logo/logo'
import {Redirect} from 'react-router-dom'
import {List, InputItem, WhiteSpace, Button, WingBlank} from 'antd-mobile';
import {login} from '../../redux/user.redux.js'
import {connect} from "react-redux";
import Icon from '../../components/Icon/icon'
import HandleChange from '../../Hoc/handleChange.js'
import QueueAnim from 'rc-queue-anim'

const btnStyle = {
    background:'rgba(255,255,255,0)',border:'none',color:'#fff'
}
@connect(
    state => state.user, {login}
)
@HandleChange
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: 'xmy',
            password: '123'
        }

    }
    register() {
        this.props.history.push('/register')
    }

    login() {
        this.props.login(this.state)
    }

    render() {
        return (
            <div className='login'>
                {this.props.redirectTo && this.props.redirectTo !== '/login' ?
                    <Redirect to={this.props.redirectTo}/> : null}
                        <Logo></Logo>
                <WingBlank size='md'>
                    <List>
                        <InputItem clear value={this.state.username}
                                   onChange={v => this.handleChange('username', v)}
                                   placeholder='请输入账号'>
                            <Icon name='wo'></Icon>
                        </InputItem>
                        <InputItem type='password' clear value={this.state.password}
                                   onChange={v => this.handleChange('password', v)}
                                   placeholder='请输入密码'>
                            <Icon name='password'></Icon>
                        </InputItem>
                    </List>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <QueueAnim type='bottom' duration={800}>
                    <Button key="a" style={btnStyle} onClick={() => {
                        this.login()
                    }}>登陆</Button>
                    <WhiteSpace/>
                    <Button key="b"  style={btnStyle} onClick={() => {
                        this.register()
                    }}>注册</Button>
                    </QueueAnim>
                </WingBlank>
            </div>
        )
    }
}

export default Login

