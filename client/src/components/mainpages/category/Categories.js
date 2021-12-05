//get category data from global
import React, {useContext, useState} from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'

const Categories = () =>{
    const state = useContext(GlobalState)
    const [accessToken] = state.token
    const [callback,setCallback] = state.categoriesAPI.callback
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = useState('')
    const [edit, setEdit] = useState(false)
    const [id,setId] =useState('')

    //create and edit category api
    const createCategory = async (event) => {
        event.preventDefault()
        try{
            if(edit){
                const res = await axios.put(`/api/category/${id}`,{cateName:category},{
                    headers: {Authorization:accessToken}
                })
                alert(res.data.msg)
            }
            else{
                const res = await axios.post("/api/category",{cateName:category},{
                    headers: {Authorization:accessToken}
                })
                alert(res.data.msg)
            }
            setEdit(false)
            setCategory('')
            setCallback(!callback)
        }
        catch(error){
            alert(error.response.data.msg)
        }
    }

    //edit category name
    const editCategory = async(id,name) =>{
        setId(id)
        setCategory(name)
        setEdit(true)
    }

    //delete category
    const deleteCategory = async (id) =>{
        try{
            const res = await axios.delete(`/api/category/${id}`,{
                headers: {Authorization: accessToken}
            })
            setCallback(!callback)
            alert(res.data.msg)
        }
        catch(error){
            alert(error.response.data.msg)
        }
    } 

    return (
        <div className="categories">
            <form onSubmit={createCategory}>
                <label htmlFor="category">Category</label>
                <input type="text" 
                    name="category" 
                    value={category} 
                    required 
                    onChange={e => setCategory(e.target.value)} />
                <button type="submit"> {edit ? "Update" : "Create"}</button>
            </form>
            <div className="col">
                {
                    categories.map(item => (
                        <div className="row" key={item._id}>
                            <p>{item.name}</p>
                            <div>
                                <button onClick={() => editCategory(item._id, item.name)}>Edit</button>
                                <button onClick={() => deleteCategory(item._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories