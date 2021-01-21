import React, { Component } from 'react'
import Menu from './Menu'

class Base extends Component {
    reload=()=>{
        this.forceUpdate();
    }
    render() {
        return (
            <div>
                <Menu/>
                <div className="container-fluid">
                    <div className="jumbotron bg-dark text-white text-center">
                        <h2 className="display-4">{this.props.title}</h2>
                        <p className='lead'>{this.props.description}</p>
                    </div>
                    <div className={this.props.className}>{this.props.children}</div>
                </div>
                <footer className="footer bg-dark mt-auto py-3">
                    <div className="container-fluid bg-success text-white text-center">
                        <h4>If u Have any Question Feel Free To Reach out</h4>
                        <button className="btn btn-warning btn-lg">Contact Us</button>
                    </div>
                    <div className="container">
                        <span className="text-muted">
                            Amazing Place to Shop
                    </span>
                    </div>
                </footer>
            </div>
        )
    }
}
Base.defaultProps = {
    title: 'My Title',
    description: 'My Description',
    className: 'bg-dark text-white p-4',
}
export default Base;