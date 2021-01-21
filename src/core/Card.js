import React, { Component } from 'react'
import ImageHelper from './ImageHelper'
import { Redirect } from 'react-router-dom'
import { addItemToCart, removeItemfromCart } from './helper/carthelper'

export default class Card extends Component {
    state={
        redirect:false
    }
    getRedirect=(redirect)=>{
        if(redirect)
        {
            return <Redirect to='/cart'></Redirect>
        }
    }
    addItemtoCart=()=>{
        addItemToCart(this.props.product,()=>this.setState(()=>({redirect:true})))
    }
    removefromCartH=async (productId)=>{
        await removeItemfromCart(productId);
        this.props.fnUpdate();
    }
    render() {
        return (
            <div className="card text-white bg-dark border border-info ">
                <div className="card-header lead">{this.props.product ? this.props.product.name:"A photo from pexels"}</div>
                <div className="card-body">
                    <div className="rounded border border-success p-2">
                       <ImageHelper product={this.props.product}/>
                    </div>
                    <p className="lead bg-success font-weight-normal text-wrap">
                        {this.props.product ? this.props.product.description : "this photo looks great"}
                      </p>
                    <p className="btn btn-success rounded  btn-sm px-4">{this.props.product ?`${this.props.product.price} INR`:"100"}</p>
                    <div className="row">
                        <div className="col-12">
                            {this.getRedirect(this.state.redirect)}
                            {this.props.addToCart && <button
                                onClick={() => {this.addItemtoCart()}}
                                className="btn btn-block btn-outline-success mt-2 mb-2"
                            >
                                Add to Cart
                          </button>}
                        </div>
                        <div className="col-12">
                            {this.props.removefromCart && <button
                                onClick={() => {this.removefromCartH(this.props.product._id)}}
                                className="btn btn-block btn-outline-danger mt-2 mb-2"
                            >
                                Remove from cart
                          </button>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
        
}
Card.defaultProps={
    addToCart:true,
    removefromCart:false
}