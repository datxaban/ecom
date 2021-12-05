import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductItem from './ProductItem'
import Filter from './Filter'
import LoadMore from './LoadMore'

const Products = () => {
    const state =useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [admin] = state.userAPI.admin
    const [accessToken] = state.token

    return (
        <>
            <Filter/>
            <div className="products">
                {products.map(product => {
                    return <ProductItem key={product._id} product={product} isAdmin={admin} accesstoken={accessToken} />
                })}
            </div>
            <LoadMore />
        </>
    )
}

export default Products