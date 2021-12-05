import React, {useContext} from 'react'
import { GlobalState } from '../../../GlobalState'
import {Link} from 'react-router-dom'

const OrderHistory = () =>{
    const state = useContext(GlobalState)
    const [orderHistory] = state.userAPI.orderHistory

    return (
        <div className="history-page">
            <h2 className="purchase-title">All Purchase</h2>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date bought</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderHistory.map(item => (
                            <tr key={item._id}>
                                <td>{item.paymentID}</td>
                                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                <td> <Link to={`/history/${item._id}`}>Detail</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )

}

export default OrderHistory
