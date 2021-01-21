import React, { Component } from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { isAutenticated } from '../auth/helper'
import { getAllProducts, deleteProduct } from './helper/adminapicall';



export default class ManageProducts extends Component {
  componentDidMount()
  {
    this.user=isAutenticated().user;
    this.token=isAutenticated().token;
    getAllProducts().then((products)=>{
      this.setState(()=>({products:[...products]}))
    })
  }  
  state={
    products:[]
  }
  
  deletethisProduct=(prodId)=>{
    deleteProduct(this.user._id,this.token,prodId).then(()=>{
      this.setState((prevState)=>({products:prevState.products.filter(prod=>prod._id!==prodId)}))
    }).catch(()=>console.log('error'));
  }
  render() {
        return (
            <Base title="Welcome admin" description="Manage products here">
            <h2 className="mb-4">All products:</h2>
            <Link className="btn btn-info" to={`/admin/dashboard`}>
              <span className="">Admin Home</span>
            </Link>
            <div className="row">
              <div className="col-12">
                <h2 className="text-center text-white my-3">Total {this.state.products.length} products</h2>
                {this.state.products.map((prod)=>{
                  return (<div className="row text-center mb-2 ">
                    <div className="col-4">
                      <h3 className="text-white text-left">{prod.name}</h3>
                    </div>
                    <div className="col-4">
                      <Link
                        className="btn btn-success"
                        to={`/admin/product/update/${prod._id}`}
                      >
                        <span className="">Update</span>
                      </Link>
                    </div>
                    <div className="col-4">
                      <button onClick={() => {this.deletethisProduct(prod._id)}} className="btn btn-danger">
                        Delete
                    </button>
                    </div>
                  </div>)
                })}
              </div>
            </div>
          </Base>
        )
    }
}
