import React from 'react'
import './icon.scss'

class Icon extends React.Component{
    render(){
        return (
            <svg className={'m-icon'}>
                <use xlinkHref={"#icon-" + this.props.name}></use>
            </svg>
        )
    }
}

export default Icon