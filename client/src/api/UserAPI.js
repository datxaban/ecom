import axios from 'axios'
import {useEffect, useState} from 'react'

const UserAPI = (token) =>{
    const [login,setLogin] = useState(false) // Login State
    const [admin, setAdmin] = useState(false) // Admin State
    const [cart,setCart] = useState([])
    const [history,setHistory] = useState([]) //user payment
    const [ordered, setOrdered] = useState([]) //all payment
    const [callback, setCallback] = useState(false)

    //get user and cart
    useEffect(()=>{
        if(token){ //check token exist
            const getUserInfor  = async()=>{
                try{
                    //get user data
                    const res = await axios.get('/user/infor',{
                        headers:{Authorization:token}
                    })
                    
                    // If access token exist, user logged in  
                    setLogin(true)

                    //set cart for new user login
                    setCart(res.data.cart)


                    //check admin role
                    res.data.isAdmin === true?  setAdmin(true): setAdmin(false)
                }
                catch(error){
                    alert(error.response.msg)
                }
            }
            getUserInfor()
        }
    },[token])

    //get all payment of account
    useEffect(()=>{
        if(token){
            const getOrderHistory = async() => {
                const response = await axios.get('/user/history',{
                    headers: {Authorization:token}
                })
                setHistory(response.data)
            }
            getOrderHistory() 
        }
    },[token])

    //get order of all payment for admin
    useEffect(()=>{
        if(admin){
            const getOrdered = async () => {
                const res = await axios.get("/api/payment",{
                    headers: {Authorization:token}
                })
                setOrdered(res.data)
            }
            getOrdered()
        }
    })

    //add product to cart and save
    const addCart = async(product) =>{
        //check login status
        if(!login) return alert("Please login")

        const check = cart.every(item => {
            if (item._id === product._id) {
                return false
            } else {
                return true
            }
        })

        if(check){
            setCart([...cart,{...product,quantity:1}])
            await axios.patch('/user/addcart', { cart: [...cart, { ...product, quantity: 1 }] }, {
                headers: { Authorization: token }
            })
        }
        else{
            alert("Product already added to cart")
        }
    } 

    return {
        login: [login, setLogin],
        admin: [admin, setAdmin],
        addCart: addCart,
        cart: [cart,setCart],
        orderHistory: [history,setHistory],
        callback: [callback,setCallback],
        ordered: [ordered,setOrdered]
    }
}

export default UserAPI