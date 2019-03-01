// import React from 'react'


// const HandleChange = WrappedComponent => {
//      return class extends React.Component {
//          render() {
//              return (
//                  <div>
//                      <WrappedComponent {...this.props}/>
//                  </div>
//              )
//          }
//      }
//  }



const HandleChange =(WrappedComponent) => {
    return class Inheritance extends WrappedComponent {
        handleChange(key, v) {
            this.setState({
                [key]: v
            })
        }
        render() {
            return super.render();
        }
    }
}


export default HandleChange