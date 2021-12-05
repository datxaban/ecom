import React, {useState,useContext,useEffect} from 'react'
import { GlobalState } from '../../../GlobalState'
import { useParams } from 'react-router-dom'

const OrderDetail = () =>{
    const state = useContext(GlobalState)
    const [orderHistory] = state.userAPI.orderHistory
    const [orderDetail, setOrderDetail] = useState([])
    const params = useParams()

    useEffect(()=>{
        if(params.id){
            orderHistory.forEach(item=>{
                if(item._id === params.id){
                    setOrderDetail(item)
                }
            })
        }
    },[params.id, orderHistory])

    if (orderDetail.length === 0) return null;
    return (
        <div className="history-page">
            <table>
                <thead>
                    <tr>
                        <th>Customer's Name</th>
                        <th>Address</th>
                        <th>ZIP Code</th>
                        <th>Country Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{orderDetail.address.recipient_name}</td>
                        <td>{orderDetail.address.line1 + " " + orderDetail.address.city + " " + orderDetail.address.state}</td>
                        <td>{orderDetail.address.postal_code}</td>
                        <td>{orderDetail.address.country_code}</td>
                    </tr>
                </tbody>
            </table>
            <table style={{ margin: "30px 0" }}>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product's Name</th>
                        <th>Quantity</th>
                        <th>Price ($)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetail.cart.map(item => (
                            <tr key={item._id}>
                                <td> <img src={item.images.url} alt="" /> </td>
                                <td>{item.title}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price * item.quantity}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderDetail