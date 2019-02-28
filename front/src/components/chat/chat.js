import React from 'react'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import {
  getChatInfoWithSb,
  sendMsg,
  receiveMsg,
  offMsg,
  cancelUnRead
} from '../../redux/chat.redux'
import './chat.scss'

@connect(
  state => state,
  { getChatInfoWithSb, sendMsg, receiveMsg, cancelUnRead }
)
class Chat extends React.Component {
  state = {
    text: ''
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getChatInfoWithSb(id)
    this.props.receiveMsg()
    this.props.cancelUnRead(id)
  }

  sendMessage() {
    const from = this.props.user._id
    const to = this.props.match.params.id
    const content = this.state.text
    if (!content) return
    this.props.sendMsg({ from, to, content })
    this.setState({
      text: ''
    })
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom() {
    const c = window.document.body.scrollHeight
    window.scroll(0, c)
  }

  componentWillUnmount() {
    offMsg()
  }

  render() {
    const from = this.props.user._id
    const username = this.props.match.params.username
    const avatar = this.props.user.avatar
    return (
      <div>
        <NavBar
          style={{ position: 'fixed', top: 0, right: 0, left: 0 }}
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          {username}
        </NavBar>
        <ul className="chat">
          {this.props.chat.chatInfo.map((v, i) => {
            return v.from._id === from ? (
              <li className="chat-me" key={i}>
                 <span className='chatting right'>{v.content}</span>
                  <img src={avatar} alt="没有加载" />
              </li>
            ) : (
              <li key={i}>
                <img alt="没有加载" src={v.from.avatar} />
                <span className='chatting left'>{v.content}</span>
              </li>
            )
          })}
        </ul>
        <div style={{ position: 'fixed', bottom: 0, right: 0, left: 0 }}>
          <List>
            <InputItem
              value={this.state.text}
              onChange={v => {
                this.setState({
                  text: v
                })
              }}
              onFocus={() => this.scrollToBottom()}
              extra={
                <span
                  onClick={() => {
                    this.sendMessage()
                  }}
                >
                  发送信息
                </span>
              }
            />
          </List>
        </div>
      </div>
    )
  }
}

export default Chat
