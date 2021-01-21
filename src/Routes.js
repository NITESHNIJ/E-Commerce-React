import React,{Component} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoute from './auth/helper/PrivateRoutes';
import AdminRoute from './auth/helper/AdminRoutes';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import AddCategory from './admin/AddCategory.js'
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import ManageCategories from './admin/ManageCategories'
import UpdateCategory from './admin/UpdateCategory';
import Cart from './core/Cart';

class Routes extends Component
{
    render()
    {
        return(<BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/signup' component={Signup}></Route>
            <Route exact path='/signin' component={Signin}></Route>
            <Route exact path='/cart' component={Cart}></Route>

            <PrivateRoute exact path='/user/dashboard' component={UserDashBoard}></PrivateRoute>
            <AdminRoute exact path='/admin/dashboard' component={AdminDashBoard}></AdminRoute>
            <AdminRoute exact path='/admin/create/category' component={AddCategory}></AdminRoute>
            <AdminRoute exact path='/admin/create/product' component={AddProduct}></AdminRoute>
            <AdminRoute exact path='/admin/products' component={ManageProducts}></AdminRoute>
            <AdminRoute exact path='/admin/categories' component={ManageCategories}></AdminRoute>
            <AdminRoute exact path='/admin/product/update/:productId' component={UpdateProduct}></AdminRoute>
            <AdminRoute exact path='/admin/category/update/:categoryId' component={UpdateCategory}></AdminRoute>




        </Switch>
        </BrowserRouter>)
    }

}
export default Routes;