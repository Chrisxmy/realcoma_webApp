import React from 'react'
import { TabBar } from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {getMessages,receiveMsg} from "../../redux/chat.redux";
import Icon from '../Icon/icon'

@withRouter
@connect(
    state=>state,{getMessages,receiveMsg}
)
class NavLinkBar extends React.Component {
    componentDidMount(){
        this.props.getMessages()
    }
    render() {
        const navList = this.props.data.filter(v=>!v.hide)
        const {pathname} = this.props.location

        const unread = this.props.chat.unread

        return (
            <div>
                <TabBar tintColor={'#4a00e0'}>
                    {navList.map((v,i)=>(
                        <TabBar.Item  key={i}
                                      title={v.text}
                                      icon={<Icon name={v.icon}></Icon>}
                                      selectedIcon={<Icon name={v.icon}></Icon>}
                                      selected={pathname === v.path}
                                      onPress={()=>{this.props.history.push(v.path)}}
                                      badge={i===1 ? unread : 0}

                        ></TabBar.Item>
                    ))}
                </TabBar>
            </div>
        );
    }
}

export default NavLinkBar