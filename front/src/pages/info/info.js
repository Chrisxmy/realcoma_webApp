import React from 'react'
import {NavBar, InputItem, TextareaItem, Button, WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux.js'
import Avatar from '../../components/avatar/avatar-selector'

@connect(
    state => state.user, {update}
)
class GeniusInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            avatar: '',
            desc: '',
            salary: '',
            title: '',
            company: ''
        }
    }

    componentDidMount() {
        this.setState({
            avatar: this.props.avatar,
            desc: this.props.desc,
            salary: this.props.salary,
            title: this.props.title,
            company: this.props.company
        })
    }

    handleChange(key, v) {
        this.setState({
            [key]: v
        })
    }


    saveGeniusInfo() {
        const {avatar, ...obj} = this.state
        this.props.update(obj)
        this.props.history.push('/genius')
    }

    selectAvatar(data) {
        this.setState({
            avatar:data.filename.avatar
        })
    }

    render() {
        const personType = this.props.type
        return (
            <div>
                {/* {this.props.redirectTo && this.props.redirectTo !== '/geniusInfo' ?
                    <Redirect to={this.props.redirectTo}/> : null} */}
                <NavBar mode="light">基本信息</NavBar>
                <div className='avatar'>
                    <Avatar avatar={this.state.avatar} onChange={(e) => {
                        this.selectAvatar(e)
                    }}></Avatar>
                </div>
                {personType === 'genius' ? (
                    <div>
                        <InputItem clear value={this.state.title} onChange={v => this.handleChange('title', v)}
                                   placeholder='求职职位'>求职职位</InputItem>
                        <InputItem clear value={this.state.salary} onChange={v => this.handleChange('salary', v)}
                                   placeholder='薪资范围'>薪资范围</InputItem>
                        <TextareaItem rows={3} count={100} clear value={this.state.desc}
                                      onChange={v => this.handleChange('desc', v)} title='个人简介'>个人简介</TextareaItem>
                    </div>
                ) : (
                    <div>
                        <InputItem clear value={this.state.title} onChange={v => this.handleChange('title', v)}
                                   placeholder='招聘职位'>招聘职位</InputItem>
                        <InputItem clear value={this.state.company} onChange={v => this.handleChange('company', v)}
                                   placeholder='公司名称'>公司名称</InputItem>
                        <InputItem clear value={this.state.salary} onChange={v => this.handleChange('salary', v)}
                                   placeholder='薪资范围'>薪资范围</InputItem>
                        <TextareaItem rows={3} count={100} clear value={this.state.desc}
                                      onChange={v => this.handleChange('desc', v)} title='任职要求'>任职要求</TextareaItem>
                    </div>
                )}

                <WhiteSpace/>
                <WhiteSpace/>
                <Button type='warning' onClick={() => {
                    this.saveGeniusInfo()
                }}>保存</Button>
            </div>
        )

    }
}

export default GeniusInfo