import React, { Component } from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { isAutenticated } from '../auth/helper'
import { getAllCategories, deleteCategory } from './helper/adminapicall';



export default class ManageCategories extends Component {
  componentDidMount()
  {
    this.user=isAutenticated().user;
    this.token=isAutenticated().token;
    getAllCategories().then((Categories)=>{
      this.setState(()=>({Categories:[...Categories]}))
    })
  }  
  state={
    Categories:[],
    deleting:false
  }
  deletingMessage=()=>{
    if(this.state.deleting)
    {
        return(
            <h4 className="text-danger">Deleting..</h4>
            )
    }
}
  deletethisProduct=(e,catId)=>{
      this.setState(()=>({deleting:true}))
      e.preventDefault();
      deleteCategory(this.user._id,this.token,catId)
      .then(()=>{
          this.setState((prevState)=>({deleting:false,Categories:prevState.Categories.filter((cat)=>cat._id!==catId)}))
      })
      .catch((err)=>console.log(err));

   
  }
  render() {
        return (
            <Base title="Welcome admin" description="Manage Categories here">
                {this.deletingMessage()}
            <h2 className="mb-4">All Categories:</h2>
            <Link className="btn btn-info" to={`/admin/dashboard`}>
              <span className="">Admin Home</span>
            </Link>
            <div className="row">
              <div className="col-12">
                <h2 className="text-center text-white my-3">Total {this.state.Categories.length} Categories</h2>
                {this.state.Categories.map((cat)=>{
                  return (<div className="row text-center mb-2 ">
                    <div className="col-4">
                      <h3 className="text-white text-left">{cat.name}</h3>
                    </div>
                    <div className="col-4">
                      <Link
                        className="btn btn-success"
                        to={`/admin/category/update/${cat._id}`}
                      >
                        <span className="">Update</span>
                      </Link>
                    </div>
                    <div className="col-4">
                        {/* TODO:DELETING CATEGORY MAY AFFECT PRODUCTS */}
                    {/* onClick={(e) =>this.deletethisProduct(e,cat._id)} */}
                      <button className="btn btn-danger">
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
