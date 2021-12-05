import React,{useContext} from 'react'
import {GlobalState} from '../../../../GlobalState'
import {Link} from 'react-router-dom'

const Payment = ()=>{
    const state = useContext(GlobalState)
    const [ordered] = state.userAPI.ordered

    return(
        <div className="history-page">
            <h2 className="purchase-title">
                All Ordered 
            </h2>
            <table>
                <thead>
                    <tr>
                        <th>Order's ID</th>
                        <th>Date Bought</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        ordered.map(item => (
                            <tr key={item._id}>
                                <td>{item.paymentID}</td>
                                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                <td> <Link to={`/payment/${item._id}`}>Detail</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Payment