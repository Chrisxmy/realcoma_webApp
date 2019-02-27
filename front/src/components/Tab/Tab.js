import React from 'react'


class MyTab extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentIndex:0
        }
    }
    title_index(index) {
        return this.state.currentIndex === index ? {color:'red',flex: 1} : {flex: 1}
    }

    render() {
        return (
            <div>
                <ul style={{display:"flex",textAlign:'center'}}>
                    {this.props.tabs && this.props.tabs.map((el,index) => {
                        return (
                            <li style={this.title_index(index)}
                                  key={index}
                            onClick={() => {this.setState({currentIndex:index})}}>{el.title}</li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}


export default MyTab