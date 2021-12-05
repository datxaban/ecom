import React,{useContext,useEffect,useState} from 'react'
import { GlobalState } from '../../../GlobalState'
import PaypalButton from './PaypalButton'
import axios from 'axios'

const Cart = () =>{
    const state = useContext(GlobalState)
    const [cart,setCart] = state.userAPI.cart
    const [total, setTotal] = useState(0)
    const [accessToken] = state.token

    //update cart to mongoDB
    const updateCart = async(cart) =>{
        await axios.patch('/user/addcart',{cart},{
            headers:{Authorization:accessToken}
        })
    }

    //increase product amount
    const plus  = (id) =>{
        cart.forEach(item => {
            if(item._id === id) {
                item.quantity += 1
            }
        })
        setCart([...cart])
        updateCart(cart)
    }

    //Decrease product number
    const minus = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                if (item.quantity === 1) {
                    return
                } else {
                    item.quantity -= 1
                }
            }
        })
        setCart([...cart])
        updateCart(cart)
    }

    //remove product from cart 
    const remove = (id) =>{
        if (window.confirm("Do you want to delete this product?")) {
            cart.forEach((product, index) => {
                if (product._id === id) {
                    cart.splice(index, 1)
                }
            })
        }
        setCart([...cart])
        updateCart(cart)
    }

    const tranSuccess = async (payment) => {
        const { paymentID, address } = payment
        await axios.post('/api/payment', { total, cart, paymentID, address }, {
            headers: { Authorization: accessToken }
        })
        setCart([])
        updateCart([])
        alert("Successfully bought new items ")
    }

    useEffect(()=>{
        const getTotal = () =>{
            const total = cart.reduce((prev,item)=>{
                return prev + (item.price * item.quantity)
            },0)
            setTotal(total)
        }
        getTotal()
    },[cart])


    if(cart.length === 0){
        return <h2 style ={{textAlign:"center",fontsize:"5rem"}}>
            Cart Empty
        </h2>
    }
    return (
        <div className="cart-container">
           {
                cart.map(product => {
                    return (
                        <div className="detail cart" key={product._id}>
                            <img src={product.images.url} alt="Product" className="img_container" />
                            <div className="detail-box">

                                <h4>{product.title}</h4>

                                <h2 className="product-price">$ {product.price * product.quantity}</h2>

                                <div className="amount">
                                    <h6>Quantity</h6>
                                    <button onClick={() => minus(product._id)}> - </button>
                                    <span> {product.quantity} </span>
                                    <button onClick={() => plus(product._id)} > + </button>
                                    <div className="delete" onClick={() => remove(product._id)} >Delete</div>
                                </div>


                                <h5 className="product-description">Description</h5>
                                <p>{product.description}</p>

                            </div>
                        </div>
                    )
                })
            }

             <div className="total">
                <h3>Total ({cart.length} products): $ {total} </h3>
                <PaypalButton total={total} tranSuccess={tranSuccess}/>
            </div>
        </div>
    )
}

export default Cart