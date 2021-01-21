import React, { Component } from 'react';
import '../styles.css'
import {API} from '../backend'
import Base from './Base'
import Card from './Card';
import { getProducts } from './helper/coreapicalls';

class Home extends Component
{
    componentDidMount()
    {
        getProducts()
        .then((data)=>{
            if(data && data.error)
            {
                this.setState(()=>({error:data.error}));
            }
            else 
            {
            this.setState(()=>({products:[...data]}))
            }
        })
    }
    state={
        products:[],
        error:''
    }
    render()
    {
        return(
           <Base title="Home Page" description="Landing Page">
               <div className="row text-center">
                   <h1 className="text-white">All Products</h1>
                   <div className="row">
                       {this.state.products.map((prod)=>(
                           <div key={prod._id} className="col-4 mb-4">
                               <Card product={prod}/>
                           </div>
                       ))}
                   </div>
               </div>
           </Base>
        )
    }
}
export default Home;