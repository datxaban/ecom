import React, { useContext } from 'react'
import {Switch, Route} from 'react-router-dom'
import Products from './products/Products'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import NotFound from './util/Error'
import DetailProduct from './products/DetailProduct/DetailProduct'
import { GlobalState } from '../../GlobalState'
import OrderHistory from './history/OrderHistory'
import OrderDetail from './history/OrderDetail'
import Payment from './admin/payment/Payment'
import PaymentDetail from './admin/payment/PaymentDetail'
import Categories from './category/Categories'
import CreateProduct from './admin/createProduct/CreateProduct'

const Pages = () =>{
    const state = useContext(GlobalState)
    const [login] = state.userAPI.login
    const [admin] = state.userAPI.admin

    return(
        <Switch>
            <Route path="/" exact component={Products}/>
            <Route path="/detail/:id" exact component={DetailProduct}/>
            
            <Route path="/category" exact component={admin ? Categories : NotFound}/>

            <Route path="/login" exact component={login? NotFound: Login}/>
            <Route path="/register" exact component={login? NotFound: Register}/>
            
            <Route path="/history" exact component={login ? OrderHistory : NotFound} />
            <Route path="/history/:id" exact component={login ? OrderDetail : NotFound} />

            <Route path="/payment" exact component={admin ? Payment : NotFound} /> 
            <Route path="/payment/:id" exact component={admin ? PaymentDetail : NotFound} /> 

            <Route path="/create_product" exact component={admin ? CreateProduct : NotFound}/> 
            <Route path="/edit_product/:id" exact component={admin ? CreateProduct : NotFound} />

            

            <Route path="/cart" exact component={Cart}></Route>
            <Route path="*" exact component={NotFound}></Route>
        </Switch>
    )
}

export default Pages