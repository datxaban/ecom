import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'

const BtnRender = ({product, delProduct}) =>{
    const state = useContext(GlobalState)
    const [admin] = state.userAPI.admin 
    const addCart = state.userAPI.addCart
    return(
        <div className="row_button">
            {
                admin?
                <>
                    <Link id="button_buy" to="#!" onClick={delProduct}>
                        Delete
                    </Link>
                    <Link id="button_buy" to={`/edit_product/${product._id}`}>
                        Edit
                    </Link>
                </>
                :<>
                    <Link id="button_buy" to="#!" onClick={()=>addCart(product)}>
                        Buy
                    </Link>
                    <Link id="button_detail" to={`/detail/${product._id}`}>
                        View
                    </Link>
                </>
            }
        </div>
    )
}

export default BtnRender