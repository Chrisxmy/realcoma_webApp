import React from 'react'
import { NavBar,InputItem,TextareaItem, Button,WhiteSpace} from 'antd-mobile';
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux.js'
import Avatar from '../../components/avatar/avatar-selector'
import axios from 'axios'

@connect(
    state=>state.user, {update}
)
class GeniusInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            avatar:'',
            desc:'',
            salary:'',
            title: '',
        }
    }

    componentDidMount(){
        this.setState({
            avatar: this.props.avatar,
            desc: this.props.desc,
            salary: this.props.salary,
            title: this.props.title,
        })
    }

    handleChange(key,v){
        this.setState({
            [key]: v
        })
    }


    saveGeniusInfo() {
        const {avatar,...obj} = this.state
        this.props.update(obj)
    }


    selectAvatar(e){
        const files = e.target.files[0]
        const url =  window.URL.createObjectURL(files);
        this.setState({
            avatar:url
        })
        let formData = new FormData()
        formData.append('file',files)
        axios({
            method:'post',
            url:'/upload',
            data:formData
        })
    }

    render() {
        return (
            <div>
                {/* {this.props.redirectTo && this.props.redirectTo !== '/geniusInfo' ?
                    <Redirect to={this.props.redirectTo}/> : null} */}
                <NavBar mode="light">Genius详情页</NavBar>
                <Avatar avatar={this.state.avatar} onChange={(e)=>{ this.selectAvatar(e)}}></Avatar>
                <InputItem clear value={this.state.title} onChange={v=>this.handleChange('title',v)} placeholder='求职职位'>求职职位</InputItem>
                <InputItem clear value={this.state.salary} onChange={v=>this.handleChange('salary',v)} placeholder='薪资范围'>薪资范围</InputItem>
                <TextareaItem  rows={3} count={100}  clear value={this.state.desc} onChange={v=>this.handleChange('desc',v)} title='个人简介'>个人简介</TextareaItem >
                <WhiteSpace/>
                <WhiteSpace/>
                <Button type='warning' onClick={() => {this.saveGeniusInfo()}}>保存</Button>
            </div>
        )

    }
}

export default GeniusInfo