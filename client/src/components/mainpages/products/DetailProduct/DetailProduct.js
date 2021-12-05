import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'
import ProductItem from '../ProductItem'

const DetailProduct = () =>{
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products

    const [detailProduct,setDetailProduct] = useState([])
    
    useEffect(()=>{
        if(params){
            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }

    },[params,products])

    if(detailProduct.length === 0) return null;

    return(
        <>
            <div className="detail-container">
                <div className="detail">
                    <img className = "detail-image" src={detailProduct.images.url} alt="" />
                    <div className="detail-box">
                        <div className="row">
                            <h2>{detailProduct.title}</h2>

                        </div>
                        <h3 className="detail-price">${detailProduct.price}</h3>
                        <p className="detail-sold">{detailProduct.sold} Sold</p>

                        <h5 className="description-title">Description</h5>
                        <p className="detail-description">{detailProduct.description}</p>
                        <p className="detail-content">{detailProduct.content}</p>
                        
                        <Link  to="#!">Buy Now</Link>
                    </div>
                </div>

                <div className="similar-container">
                    <div>
                        <h2 className="similar-title">Related Product</h2>
                        <div className="products">
                            {
                                products.map(product =>{
                                    return ((product.category === detailProduct.category)) 
                                        ? <ProductItem key ={product._id}
                                        product={product}
                                        /> : null
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailProduct