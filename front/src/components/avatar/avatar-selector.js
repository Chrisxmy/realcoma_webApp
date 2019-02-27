import React from 'react'


class AvatarPicker extends React.Component {
    selectAvatar(e){
        this.props.onChange(e)
    }

    render() {
        return (
            <div style={{textAlign:'center'}}>
                <img style={{width:80,height:80,margin:'10px 10px 10px 0',verticalAlign:'middle'}}
                     src={this.props.avatar}
                     ></img>
                <label htmlFor="avatar">选择头像</label>
                <input id='avatar' style={{display:'none'}} type='file' onChange={(e)=>{this.selectAvatar(e)}}/>
            </div>
        );
    }
}

export default AvatarPicker