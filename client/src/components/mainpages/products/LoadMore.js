import React, {useContext} from 'react'
import { GlobalState } from '../../../GlobalState'

const LoadMore = () =>{
    const state = useContext(GlobalState)
    const [page,setPage] = state.productsAPI.page
    const [result] = state.productsAPI.result

    return(
        <div className="load_more">
            {result < page * 15? "": 
            <button
                onClick = {()=>setPage(page + 1)}>
                More products
            </button>}
        </div>
    )
}

export default LoadMore