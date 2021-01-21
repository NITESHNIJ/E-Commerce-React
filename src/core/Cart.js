import React, { Component } from 'react';
import '../styles.css'
import Base from './Base'
import Card from './Card';
import {loadCart} from './helper/carthelper'
import { API } from '../backend';

class Cart extends Component
{     
    componentDidMount()
    {
        console.log('HERE IN COMPONENT DID MOUNT');
        this.setState(()=>({products:[...loadCart()]}))
    }
    state={
        products:[],
    }
    updateIt=(prodid)=>{
        this.setState((prevState)=>({products:prevState.products.filter(prod=>prod._id!==prodid)}))
    }
    loadAllProducts=()=>{
        return(
        <div>
            <h2>This section is to load all products</h2>
            {this.state.products.map((prod,index)=>(<Card
             key={index}
             product={prod}
             removefromCart={true}
             addToCart={false}
             fnUpdate={()=>this.updateIt(prod._id)}
             />))}
        </div>)
    }
    loadCheckout=()=>{
        return(
            <div>
                <h2>This section is to load checkout</h2>
            </div>
        )
    }
    
    render()
    {
        return(
           <Base title="Cart Page" description="Landing Page">
               <div className="row">
                   <div className="col-6">
                       {this.loadAllProducts()}
                   </div>
                   <div className="col-6">
                       {this.loadCheckout()}
                   </div>
               </div>
           </Base>
        )
    }
}
export default Cart;