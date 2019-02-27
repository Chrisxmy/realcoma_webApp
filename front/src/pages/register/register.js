import React from 'react'
import Logo from '@/components/logo/logo'
import { Redirect } from 'react-router-dom'
import { List, InputItem, WhiteSpace ,Button, Radio, WingBlank} from 'antd-mobile';
import { connect } from 'react-redux'
import {register} from '../../redux/user.redux.js'
import Icon from '../../components/Icon/icon'

const RadioItem = Radio.RadioItem;

const btnStyle = {
    background:'rgba(255,255,255,0)',border:'none',color:'#fff'
}
@connect(
    state=>state.user, {register}
)
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 'genius',
            username:'',
            password:'',
            repeatPassword:''
        }
    }

    handleChange(key,v){
        this.setState({
            [key]: v
        })
    }

    login(){
        this.props.history.push('/login')
    }

    register(){
        this.props.register(this.state)
    }
    render() {
        return (
            <div className='register'>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/>: null}
                <Logo></Logo>
                <WingBlank size='md'>
                <List>
                    <InputItem
                        clear
                        onChange={v=>this.handleChange('username',v)}
                        placeholder='请输入账号'>
                        <Icon name='wo'></Icon>
                    </InputItem>
                    <InputItem
                        clear
                        type='password'
                        onChange={v=>this.handleChange('password',v)}
                        placeholder='请输入密码'>
                        <Icon name='password'></Icon>
                    </InputItem>
                    <InputItem
                        clear
                        type='password'
                        onChange={v=>this.handleChange('repeatPassword',v)}
                        placeholder='请再次输入密码'>
                        <Icon name='password'></Icon>
                    </InputItem>
                </List>
                </WingBlank>
                <WingBlank size='md'>
                <WhiteSpace/>
                <RadioItem onClick={()=>this.handleChange('type','candidate')} checked={this.state.type==='genius'}>Candidate</RadioItem>
                <RadioItem onClick={()=>this.handleChange('type','boss')} checked={this.state.type ==='boss'}>Boss</RadioItem>
                <WhiteSpace/>
                <WhiteSpace/>
                <Button style={btnStyle} onClick={()=>{this.register()}}>注册</Button>
                <WhiteSpace/>
                <WhiteSpace/>
                <p onClick={()=>{this.login()}} style={{color:"#fff",textAlign:'center'}}> >> 返回登陆 &#60;&#60; </p>
                </WingBlank>
            </div>
        )
    }
}

export default Register