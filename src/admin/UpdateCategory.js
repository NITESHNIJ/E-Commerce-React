import React, { Component } from 'react'
import Base from '../core/Base';
import { isAutenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { updateCategory } from './helper/adminapicall';

class UpdateCategory extends Component {
    state={
        name:"",
        success:false,
        error:false
    }
    user=isAutenticated().user;
    token=isAutenticated().token;
    onChange=(value)=>{
        this.setState(()=>({name:value}))
    }
    onSubmit=(event)=>{
        event.preventDefault();
        this.setState(()=>({error:'',success:false}))
        const {name}=this.state;
        updateCategory(this.user._id,this.token,{name},this.props.match.params.categoryId)
        .then((data)=>{
            if(data.error)
            {
                this.setState(()=>({error:data.error}))
            }
            else
            {
                this.setState(()=>({success:true,error:'',name:''}))
            }
        })
        .catch()
    }
    successMessage=()=>{
        if(this.state.success)
        {
            return(
                <h4 className="text-success">Updated Category Succesfully</h4>
                )
        }
    }
    errorMessage=()=>{
        if(this.state.error)
        {
            return(
                <h4 className="text-danger">Some errror ocuured.Please Try Again</h4>
                )
        }
    }
    myCategoryform=()=>{
        return(<form >
            <div className="form-group">
                <p className="lead">Enter the category</p>
                <input value={this.state.name} onChange={(e)=>this.onChange(e.target.value)} type="text" className="form-control my-3" autoFocus required placeholder="for ex summer"/>
                <button onClick={this.onSubmit} className="btn btn-outline-info">Update</button>
            </div>
        </form>)
    }
    goback=()=>(
        <div className="mt-5">
            <Link className="btn btn-sm btn-info mb-3" to='/admin/dashboard'>Back</Link>
        </div>
    )
    render() {
        return (
            <Base title="Update Category here"
             description="update category here"
             className="container bg-info p-4"
             >
               <div className="row bg-white rounded">
                   <div className="col-md-8 offset-md-2">
                      {this.successMessage()}
                      {this.errorMessage()}
                      {this.myCategoryform()}
                      {this.goback()}
                   </div>
               </div>
            </Base>
        )
    }
}
export default UpdateCategory;
