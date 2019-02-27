import React from 'react'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux'
import { getUserList } from "../../redux/userlist.redux";

@connect(
    state=>state.chatuser,{getUserList}
)
class Boss extends React.Component {
    componentDidMount() {
         this.props.getUserList('genius')
    }
    chat(v){
        this.props.history.push(`/chat/${v._id}/${v.username}`)
    }
    render() {
        const userList = this.props.userList
        return (
            <div>
                <WingBlank size="md">
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
                                        <div>{v.desc}</div>
                                    </Card.Body>
                                    <Card.Footer content={v.username} extra={<div>extra footer content</div>}/>
                                </Card>
                            </div>
                        ))
                    }
                </WingBlank>
            </div>
        );
    }
}

export default Boss