import React, { Component } from 'react'
import Base from '../core/Base';
import { Link, Redirect } from 'react-router-dom';
import { getAllCategories, createProduct,waittoRedirect } from './helper/adminapicall';
import {isAutenticated} from '../auth/helper'

export default class AddProduct extends Component {
   
    componentDidMount()
    {
        getAllCategories().then((data)=>{
            this.setState(()=>({categories:[...data],formData:new FormData()}))
        })
        this.user=isAutenticated().user;
        this.token=isAutenticated().token;
    }
    state={
        name:'',
        description:'',
        price:'',
        stock:'',
        photo:'',
        categories:[],
        category:'',
        loading:false,
        error:'',
        createdProduct:"",
        getaRedirect:false,
        formData:'',
        success:false,
        finallyRedirect:false
    }
    handleChange=(name)=>(value)=>{
        this.state.formData.set(name,value);
        this.setState(()=>({[name]:value}));
        console.log(this.state.formData.get(name));
    }
    onSubmit=(e)=>{
        e.preventDefault();
        console.log(this.state.formData);
        this.setState(()=>({error:'',loading:true,}))
        createProduct(this.user._id,this.token,this.state.formData)
        .then((data)=>{
            if(data.error)
            {
                this.setState(()=>({error:data.error,loading:false}))
            }
            else
            {
                this.setState(() => ({
                    success: true, 
                    loading: false,
                    name: '',
                    price: '',
                    description: '',
                    photo: '',
                    stock: '',
                    category: '',
                    error: '',
                    createdProduct:data,
                    getaRedirect: true,
                    formData: new FormData()
                }))
                this.doRedirect()
            }
        })
    }
     createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={(e)=>{this.handleChange("photo")(e.target.files[0])}}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
               
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={(e)=>this.handleChange("name")(e.target.value)}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={this.state.name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={(e)=>this.handleChange("description")(e.target.value)}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={this.state.description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={(e)=>this.handleChange("price")(e.target.value)}
              type="number"
              className="form-control"
              placeholder="Price"
              value={this.state.price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={(e)=>this.handleChange("category")(e.target.value)}
              className="form-control"
              placeholder="Category"
              value={this.state.category}
            >
                 <option defaultValue>Select</option>
                {this.state.categories.map((cat)=>(<option value={cat._id}>{cat.name}</option>))}
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={(e)=>this.handleChange("stock")(e.target.value)}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={this.state.stock}
            />
          </div>
          
          <button type="submit" onClick={this.onSubmit} className="btn btn-outline-success">
            Create Product
          </button>
        </form>
      );
      loadingMesaage=()=>{
          if(this.state.loading)
          {
              return(<div className="alert alert-info" style={{display:this.state.loading?'':'none'}}>
              Loading...
             </div>)
          }
      }
      successMesaage=()=>{
        if(this.state.success)
        {
            return(<div className="alert alert-info" style={{display:this.state.success?'':'none'}}>
            Product Created Successfully
           </div>)
        }
    }
    errorMesaage=()=>{
        if(this.state.error)
        {
            return(<div className="alert alert-danger" style={{display:this.state.error?'':'none'}}>
            Some Error Occured {this.state.error}
           </div>)
        }
    }
    doRedirect=()=>{
      if(this.state.getaRedirect)
      {
      waittoRedirect().then(()=>{
      //alert('promise resolved');
      this.setState(()=>({finallyRedirect:true}));
      }
      ).catch(()=>console.log('error'));
    }
    }
    render() {
        return (
            <Base title="Add Product" description="Add your products here" className="container bg-info p-4">
                {this.state.finallyRedirect && <Redirect to='/admin/dashboard'></Redirect>}
               <h1 className="text-white">Add Product</h1>
                {/* {this.createProductForm()} */}
                <Link to='/admin/dashboard' className='btn btn-md btn-dark mb-3'>Admin Home</Link>
                <div className="row bg-dark p-4 text-white rounded">
                    <div className="col-md-8 offset-md-2">
                        {this.successMesaage()}
                        {this.errorMesaage()}
                        {this.loadingMesaage()}
                        {this.createProductForm()} 
                    </div>
                </div>
            </Base>
        )
    }
}
