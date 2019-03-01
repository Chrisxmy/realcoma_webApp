import axios from 'axios/index'
import io from 'socket.io-client'

const socketUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8888' : '/'

const socket = io(socketUrl)

const CHAT_INfO = 'CHAT_INfO'
const ADD_CHAT_INfO = 'ADD_CHAT_INfO'
const MESSAGE_LIST = 'MESSAGE_LIST'

const initState = {
  chatInfo: [],
  messages: [],
  unread: 0
}

export function chat(state = initState, action) {
  switch (action.type) {
    case CHAT_INfO:
      return {
        ...state,
        chatInfo: action.payload.msg,
      }
    case ADD_CHAT_INfO:
      return {
        ...state,
        chatInfo: [...state.chatInfo, action.payload],
        unread: state.unread+1,
        messages: [...state.messages, action.payload]
      }
    case MESSAGE_LIST:
      return {
        ...state,
        messages: action.payload,
        unread: action.payload.filter(v => !v.isRead).length
      }
    default:
      return state
  }
}

function chatInfo(msg) {
  return { type: CHAT_INfO, payload: { msg } }
}

function addChatInfo(msg) {
  return { type: ADD_CHAT_INfO, payload: msg }
}

function msgList(msgs) {
  return { type: MESSAGE_LIST, payload: msgs }
}

export function getChatInfoWithSb(target) {
  return dispatch => {
    axios({
      method: 'get',
      url: '/chat/list',
      params: {
        target
      }
    }).then(res => {
      if (res.data.code === 0) {
        dispatch(chatInfo(res.data.data))
      }
    })
  }
}

export function receiveMsg() {
  return dispatch => {
    socket.on('receiveMsg', function(msg) {
      dispatch(addChatInfo(msg))
    
    })
  }
}
export function offMsg() {
  socket.off('receiveMsg')
}

export function sendMsg({ from, to, content }) {
  return dispatch => {
    socket.emit('sendMsg', { from, to, content })
  }
}

export function cancelUnRead(id) {
  return dispatch => {
    axios({
      method: 'post',
      url: '/chat/cancelUnread',
      data: {
        target: id
      }
    }).then(res => {
      if (res.data.code === 0) {
      }
    })
  }
}

export function getMessages() {
  return dispatch => {
    axios({
      method: 'get',
      url: '/chat/messages'
    }).then(res => {
      if (res.data.code === 0) {
        dispatch(msgList(res.data.data))
      }
    })
  }
}

export function deleteMsgById(id) {
  return dispatch => {
    axios({
      method: 'post',
      url: '/chat/deleteMsgById',
      data: {
        target: id
      }
    }).then(res => {
      if (res.data.code === 0) {
        // dispatch({type:CANCEL_UNREAD})
      }
    })
  }
}
