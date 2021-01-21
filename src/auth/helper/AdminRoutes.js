import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {isAutenticated} from './index' 

function AdminRoute({component:Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAutenticated() && isAutenticated().user.role===1 ? (
            <Component {...props} ></Component>
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

export default AdminRoute;