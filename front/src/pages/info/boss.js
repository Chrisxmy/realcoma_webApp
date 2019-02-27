import React from 'react'
import { NavBar,InputItem,TextareaItem, Button, WhiteSpace } from 'antd-mobile';
import {Redirect} from 'react-router-dom'
import Avatar from '@/components/avatar/avatar-selector.js'
import { connect } from 'react-redux'
import {update} from '../../redux/user.redux.js'
import axios from 'axios'


@connect(
    state=>state.user, {update}
)
class BossInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            avatar:'',
            desc:'',
            salary:'',
            title: '',
            company: ''
        }
    }

    componentDidMount(){
        this.setState({
            avatar: this.props.avatar,
            desc: this.props.desc,
            salary: this.props.salary,
            title: this.props.title,
            company: this.props.company,
        })
    }

    handleChange(key,v){
        this.setState({
            [key]: v
        })
    }
    saveBossInfo() {
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
            url:'upload',
            data:formData
        })
    }

    render() {
        return (
            <div>
                <NavBar mode="light">Boss详情页</NavBar>
                <Avatar avatar={this.state.avatar} onChange={(e)=>{ this.selectAvatar(e)}}></Avatar>
                    <InputItem clear value={this.state.title} onChange={v=>this.handleChange('title',v)} placeholder='招聘职位'>招聘职位</InputItem>
                    <InputItem clear value={this.state.company} onChange={v=>this.handleChange('company',v)} placeholder='公司名称'>公司名称</InputItem>
                    <InputItem clear value={this.state.salary} onChange={v=>this.handleChange('salary',v)} placeholder='薪资范围'>薪资范围</InputItem>
                    <TextareaItem  rows={3} count={100}  clear value={this.state.desc} onChange={v=>this.handleChange('desc',v)} title='任职要求'>任职要求</TextareaItem >
                <WhiteSpace/>
                <WhiteSpace/>
                <Button type='warning' onClick={() => {this.saveBossInfo()}}>保存</Button>
            </div>
        )

    }
}

export default BossInfo