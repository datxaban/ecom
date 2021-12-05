import React, {useState,useContext,useEffect} from 'react'
import { GlobalState } from '../../../../GlobalState'
import { useParams } from 'react-router'

const PaymentDetail = () => {
    const params = useParams()
    const [paymentDetail, setPaymentDetail] = useState([])
    const state = useContext(GlobalState)
    const [ordered] = state.userAPI.ordered

    useEffect(()=>{
        ordered.forEach(item =>{
            if(item._id === params.id){
                setPaymentDetail(item)
            }
        })
    },[params.id, ordered])

    if(paymentDetail.length === 0) return null

    return(
        <div className="history-page">
            <table>
                <thead>
                    <tr>
                        <th>Customer's Name</th>
                        <th>Address</th>
                        <th>ZIP code</th>
                        <th>Country Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{paymentDetail.address.recipient_name}</td>
                        <td>{paymentDetail.address.line1 + " " + paymentDetail.address.city + " " + paymentDetail.address.state}</td>
                        <td>{paymentDetail.address.postal_code}</td>
                        <td>{paymentDetail.address.country_code}</td>
                    </tr>
                </tbody>
            </table>

            <table style={{ margin: "30px 0" }}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Product 's Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        paymentDetail.cart.map(item => (
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

export default PaymentDetail
