import React, {useContext} from 'react'
import { GlobalState } from '../../../GlobalState'

const Filter = () => {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = state.productsAPI.category
    const [sort,setSort] = state.productsAPI.sort

    return(
        <div className="filter_menu">
            <div className="category-container" >
                <div className="row">
                    <select name="category" value={category} onChange={event => setCategory(event.target.value)}>
                        <option value="">Category</option>
                        {
                            categories.map(item => (
                                <option value={"category=" + item._id} key={item._id}>
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <div className="row">
                <span>Sort by:</span>
                <select name="sort" value={sort}
                    onChange={event => setSort(event.target.value)}
                >
                    <option value="">Newest</option>
                    <option value="sort=oldest">Oldest</option>
                    <option value="sort=-sold">Best sales</option>
                    <option value="sort=-price">Price: Highest to lowest</option>
                    <option value="sort=price">Price: Lowest to highest</option>
                </select>
            </div>
        </div>
    )
}

export default Filter