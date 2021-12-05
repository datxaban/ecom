import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import BtnRender from './BtnRender'
import axios from 'axios'

const ProductItem = ({product,accessToken}) =>{
    const state = useContext(GlobalState)
    const [callback,setCallback] = state.productsAPI.callback


    const delProduct = async() =>{
        try {
            //delete item image
            const deleteImages = axios.post('/api/deleteImage', { public_id: product.images.public_id }, {
                headers: { Authorization: accessToken }
            })

            //delete item date
            const deleteItem = axios.delete(`/api/products/${product._id}`, {
                headers: { Authorization: accessToken }
            })

            await deleteImages
            await deleteItem
            setCallback(!callback)

        }catch(error){
            alert(error.response.data.msg)
        }
    }

    return (
        
        <div className="product_card">
            <div className="product_image">
                <img src={product.images.url} alt="product images" />
            </div>

            <div className="product_title">
                <h5 title={product.title}>{product.title}</h5>
            </div>

            <div className="product_detail">
                <div className="product_price">
                    <span className="price_symbol">$</span>
                    <span className="span_price">{product.price}</span>
                </div>
                <BtnRender product={product} delProduct={delProduct} />
            </div>
        </div>
    )
}

export default ProductItem