import React, {useContext,useState} from 'react'
import { GlobalState } from '../../GlobalState'
import Cart from './icon/shopping_bag.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'


const Header = () =>{
    const state = useContext(GlobalState)
    const [login,setLogin] = state.userAPI.login
    const [admin,setAdmin] = state.userAPI.admin
    const [cart] =state.userAPI.cart
    const [search,setSearch] = state.productsAPI.search
    const [searchInput,setSearchInput] = useState('')

    //Logout function
    const logout = async () =>{
        try{
            await axios.get("/user/logout")
            localStorage.clear()
            setAdmin(false)
            setLogin(false)
            window.location.href = "/"
        }
        catch(error){
            alert(error.response.data.msg)
        }
    }
    

    const changeHandle = event =>{
        setSearch(event.target.value.toLowerCase())
        setSearchInput(event.target.value.toLowerCase())
    }

    const adminView = () =>{
        return (
            <>
                <li>
                    <Link to="/create_product">Add Product</Link>
                </li>
                <li>
                    <Link to="/category">Category</Link>
                </li>
                <li>
                    <Link to="/payment"> Ordered </Link>
                </li>
            </>
        )
    }

    const userView = () =>{
        return (
            <>
                {admin? ' ': <li>
                    <Link to="/history">My Purchase</Link>
                </li>}
                <li>
                    <Link to="/" onClick = {logout}>Logout</Link>
                </li>
            </>
        )
    }

    const guestView = () =>{
        return (
            <>
                <ul>
                    <li>
                        <Link to="/register">Sign Up</Link>
                    </li>
                    <li>|</li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </>
        )
    }

    return (
        <header>
            <div className="logo">
                <h2>
                    <Link to="/">Jelly Bakery</Link>
                </h2>
            </div>

            <div className="search-bar">
                <input type="text" 
                    name="search" 
                    value ={search}
                    placeholder="Searching your favorite cakes"
                    onChange={changeHandle}
                    />
                <button type="submit" 
                    className="search-button fas fa-search" 
                    >
                </button>
            </div>

            <div className="menu">
                    <ul>
                        {admin && adminView()}
                        {login ? userView(): guestView()}
                    </ul>
            </div>

            {
                admin? ' ':
                    <div className="cart-icon">
                        <span>{cart.length}</span>
                        <Link to="/cart">
                            <img src={Cart} alt="" width="23" />
                        </Link>
                    </div>
            }
        </header>
    ) 
}

export default Header