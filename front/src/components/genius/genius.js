import React from 'react'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux'
import { getUserList } from "../../redux/userlist.redux";
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'

@withRouter
@connect(
    state=>state.chatuser,{getUserList}
)
class Genius extends React.Component {
    componentDidMount() {
        this.props.getUserList('boss')
    }
    chat(v){
        this.props.history.push(`/chat/${v._id}/${v.username}`)
    }
    render() {
        const userList = this.props.userList
        return (
            <div>
                <WingBlank size="md">
                    <QueueAnim type='scaleX' duration={800}>
                    {
                        userList && userList.map((v,i) => (
                            <div key={i}>
                                <WhiteSpace></WhiteSpace>
                                <Card onClick={()=>{this.chat(v)}}>
                                    <Card.Header
                                        title={v.title}
                                        thumb={v.avatar}
                                        thumbStyle={{width:'30px'}}
                                        extra={<span>{v.salary}</span>}
                                    />
                                    <Card.Body>
                                        <div>任职要求：{v.desc}</div>
                                    </Card.Body>
                                    <Card.Footer content={v.username} extra={<div>{v.company}</div>}/>
                                </Card>
                            </div>
                        ))
                    }
                    </QueueAnim>
                </WingBlank>
            </div>
        );
    }
}

export default Genius