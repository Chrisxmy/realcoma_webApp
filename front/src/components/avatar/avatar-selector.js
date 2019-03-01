import React from 'react'
import axios from 'axios'
import './avatar-selector.scss'

class AvatarPicker extends React.Component {
    selectAvatar(e){
        const files = e.target.files[0]
        let formData = new FormData()
        formData.append('file', files)
        axios({
            method: 'post',
            url: '/upload',
            data: formData
        }).then(res => {
            this.props.onChange(res.data)
        })
    }

    render() {
        return (
            <div className='avatar-selector'>
                <img src={this.props.avatar} alt=''
                     ></img>
                <label htmlFor="avatar" className='select'></label>
                <input id='avatar' style={{display:'none'}} type='file' onChange={(e)=>{this.selectAvatar(e)}}/>
            </div>
        );
    }
}

export default AvatarPicker