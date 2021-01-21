import React, { Component } from 'react'
import { API } from '../backend'

// src = "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"

export default class ImageHelper extends Component {
    render() {
        
        return (
            <img
            src={this.props.product?`${API}/product/photo/${this.props.product._id}`:"https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}
            alt="phot"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            className="mb-3 rounded"
        />
        )
    }
}
