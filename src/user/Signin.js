import React, { Component} from 'react'
import Base from '../core/Base';
import { Link, Redirect } from 'react-router-dom';
import {authenticate,isAutenticated,signin} from '../auth/helper/index'

class Signin extends Component {
    state={
        email:'',
        password:'',
        error:'',
        loading:false,
        didRedirect:false
    }
    
    handleChange=name=>value=>{
        this.setState(()=>({[name]:value,error:false}))
    }
    loadingMessage=()=>(
        <div className="alert alert-info col-md-6 offset-sm-3" style={{display:this.state.loading?'':'none'}}>
            Loading...
        </div>
    )
    errorMessage=()=>(
        <div className="alert alert-danger col-md-6 offset-sm-3" style={{display:this.state.error?'':'none'}}>
          {this.state.error}
        </div>
    )
    onSubmit=(e)=>{
        e.preventDefault();
        this.setState(()=>({error:false,loading:true}))
        let statechange=(state)=>{
            this.setState(()=>(state));
        }
        signin({email:this.state.email,password:this.state.password})
        .then((data)=>{
            console.log(data);
            if(data.error)
            {
                statechange({error:data.error,loading:false})
            }
            else{
            authenticate(data,()=>{
                statechange({didRedirect:true,loading:false,success:true,email:'',password:''})
            })
            } 
        })
        .catch((err)=>console.log('error in sigin component'));
    }
    obj=isAutenticated()
    
     performRedirect=()=>
     {
         let {user}=isAutenticated();
         console.log(user);
         if(user && user.role===1)
         {
            console.log('user role-->1');
            return(<Redirect to='/admin/dashboard'></Redirect>)
         }
         else if(user){
            return(<Redirect to='/user/dashboard'></Redirect>)
         }
        
     }
    signinForm=()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">
                                Email
                            </label>
                            <input onChange={(e)=>{this.handleChange("email")(e.target.value)}} value={this.state.email} className='form-control' type="text"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">
                                Password
                            </label>
                            <input onChange={(e)=>{this.handleChange("password")(e.target.value)}} value={this.state.password} className='form-control' type="password"/>
                        </div>
                        <button onClick={this.onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
            )
    }
    render() {
        return (
            <Base title='Signin' description='Signin here'>
              
                {isAutenticated() && (<Redirect to='/'></Redirect>)}
                {this.errorMessage()}
                {this.loadingMessage()}
                {this.state.didRedirect && this.performRedirect()}
                {this.signinForm()}
                {JSON.stringify(this.state)}
            </Base>
        )
    }
}
export default Signin;