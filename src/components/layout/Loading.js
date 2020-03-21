import React, { Component } from 'react'

export class Loading extends Component {
    render() {
        return (
            <div className="loading-container">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
            </div>
        )
    }
}

export default Loading
