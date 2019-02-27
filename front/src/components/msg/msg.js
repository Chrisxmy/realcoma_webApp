import React from 'react'
import { List, Badge, SwipeAction } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMessages } from '../../redux/chat.redux'

@connect(
  state => state,
  { getMessages }
)
class Msg extends React.Component {
  getLast(arr) {
    return arr[arr.length - 1]
  }

  deleteMsgById(v){
    
  }

  render() {
    let group = {}
    this.props.chat.messages.forEach(v => {
      group[v.chatId] = group[v.chatId] || []
      group[v.chatId].push(v)
    })
    const messages = Object.values(group).sort((a, b) => {
      let last_a = this.getLast(a)
      let last_b = this.getLast(b)
      return last_a.createTime < last_b.createTime
    })
    return (
      <div>
        <List>
            {messages.map((v, i) => {
              const lastItem = this.getLast(v)
              return (
                <SwipeAction
                key={i}
                style={{ backgroundColor: 'gray', touchAction: 'none' }}
                autoClose
                right={[
                  {
                    text: 'Delete',
                    onPress: () => this.deleteMsgById(v),
                    style: { backgroundColor: '#F4333C', color: 'white' }
                  }
                ]}
              >
                <List.Item
                  arrow="horizontal"
                  onClick={() =>
                    this.props.history.push(`/chat/${lastItem.from._id}/${lastItem.from.username}`)
                  }
                >
                  <Badge text={v.filter(e => !e.isRead).length}>
                    <img
                      src={v[0] && v[0].from.avatar}
                      style={{
                        width: '26px',
                        height: '26px',
                        background: '#ddd',
                        display: 'inline-block'
                      }}
                      alt="没有加载"
                    />
                  </Badge>
                  <span style={{ marginLeft: 20 }}>{lastItem.content}</span>
                </List.Item>
                </SwipeAction>
              )
            })}
        </List>
      </div>
    )
  }
}

export default Msg
