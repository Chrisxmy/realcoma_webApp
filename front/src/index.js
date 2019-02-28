import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import reducer from './reducer.js'
import './assets/css/reset.scss'
import './assets/css/common.scss'
import Login from './pages/login/login.js'
import Register from './pages/register/register.js'
import AuthRoute from './components/AuthRoute/AuthRoute.js'
import Info from './pages/info/info.js'
import DashBoard from './components/DashBoard/DashBoard.js'
import Chat from './components/chat/chat.js'



const reduxDevtools = window.devToolsExtension ? window.devToolsExtension : f=>f



const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    reduxDevtools()
))

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            hasError: false
        }
    }

    componentDidCatch(err,info){
        this.setState({
            hasError:true
        })
    }
    render(){
        return (<Provider store={store}>
            <BrowserRouter>
                <div>
                    <AuthRoute></AuthRoute>
                    <Switch>
                        <Route path='/info' component={Info}></Route>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/register' component={Register}></Route>
                        <Route path='/chat/:id/:username' component={Chat}></Route>
                        <Route component={DashBoard}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>)
    }
}


ReactDOM.render(
    <App/>
    ,
    document.getElementById('root')
);


