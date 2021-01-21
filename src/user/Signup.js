import React, { Component} from 'react'
import Base from '../core/Base';
import { Link, Redirect } from 'react-router-dom';
import { signup, isAutenticated } from '../auth/helper';

class Signup extends Component {
    state={
        name:'',
        email:'',
        password:'',
        error:'',
        success:false
    }

    signupForm=()=>{
   
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">
                                Name
                            </label>
                            <input onChange={(event)=>{this.handleChange("name")(event.target.value)}} value={this.state.name} className='form-control' type="text"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">
                                Email
                            </label>
                            <input onChange={(event)=>{this.handleChange("email")(event.target.value)}} value={this.state.email}  className='form-control' type="email"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">
                                Password
                            </label>
                            <input onChange={(event)=>{this.handleChange("password")(event.target.value)}} value={this.state.password} className='form-control' type="password"/>
                        </div>
                        <button onClick={this.onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
            )
    }

    handleChange=name=>value=>{
        this.setState(()=>({[name]:value,error:false}))
    }
    onSubmit=(e)=>
    {
        const {name,email,password}=this.state;
        this.setState(()=>({error:false}))
         let fn=(state)=>
         {
             this.setState(()=>({...state}))
         }
        e.preventDefault();
        signup({name,email,password})
        .then((data)=>{
            if(data.error)
            {
                console.log(data.error);
                fn({error:data.error,success:false})
            }
            else
            {
                fn({name:'',email:'',password:'',error:'',success:true})
            }
        })
        .catch((err)=>console.log('error in signup component'));
    }
    successMessage=()=>(
        <div className="alert alert-success col-md-6 offset-sm-3" style={{display:this.state.success?'':'none'}}>
            New Account Created Succesfully.<Link to='/signin'>Login Here</Link>
        </div>
    )
    errorMessage=()=>(
        <div className="alert alert-danger col-md-6 offset-sm-3" style={{display:this.state.error?'':'none'}}>
          {this.state.error}
        </div>
    )
    render() {
        return (
            <Base title='Signup' description='Signup here'>
                {isAutenticated() && (<Redirect to='/'>
                </Redirect>)}
                {this.successMessage()}
                {this.errorMessage()}
                {this.signupForm()}
                {JSON.stringify(this.state)}
            </Base>
        )
    }
}
export default Signup;