import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import { signout, isAutenticated } from '../auth/helper'

class Menu extends Component {
    currentTab=(history,path)=>{
        if(history.location.pathname===path){
            return {color:'#2ecc72'}
        }
        else
        {
            return {color:'white'}
        }       

    }
    render() {
        
        
        return (
            <div>
                <ul className="nav nav-tabs bg-dark">
                    <li className='nav-item'>
                        <Link style={this.currentTab(this.props.history,"/")} className='nav-link' to='/'>Home</Link>
                    </li>
                    <li className='nav-item'>
                        <Link style={this.currentTab(this.props.history,"/cart")} className='nav-link' to='/cart'>Cart</Link>
                    </li>
                    {isAutenticated() && isAutenticated().user.role===1 && (  <li className='nav-item'>
                        <Link style={this.currentTab(this.props.history,"/admin/dashboard")} className='nav-link' to='/admin/dashboard'>A.DashBoard</Link>
                    </li>)}
                    {isAutenticated() && isAutenticated().user.role===0 && (  <li className='nav-item'>
                        <Link className='nav-link' style={this.currentTab(this.props.history,"/user/dashboard")} to='/user/dashboard'>DashBoard</Link>
                    </li>)}
                    
                    {!isAutenticated() && (<React.Fragment>
                    <li className='nav-item'>
                        <Link style={this.currentTab(this.props.history,"/signup")} className='nav-link' to='/signup'>Signup</Link>
                    </li>
                    <li className='nav-item'>
                        <Link style={this.currentTab(this.props.history,"/signin")} className='nav-link' to='/signin'>Signin</Link>
                    </li>
                    </React.Fragment>)}
              
                  
                    {isAutenticated() && (<li className='nav-item'>
                       <span onClick={()=>{
                           signout(()=>{
                               this.props.history.push('/')
                           });

                       }} className="nav-link text-warning">Signout</span>
                    </li>)}
                </ul>
            </div>
        )
    }
}
//FIXME:i have not wrapped this component with withRouter let's see what error jumps in
//NOTICE:TO GET ACCES TO ROUTE PROPS IN  THIS WE USED WITHROUTER 
export default withRouter(Menu);