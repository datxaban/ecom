import {useState,useEffect} from 'react'
import axios from 'axios'

const CategoriesAPI = () =>{
    const [categories,setCategories] = useState([])
    const [callback,setCallback] = useState(false)

    //get all categories
    const getCategory = async() =>{
        const res = await axios.get("/api/category")
        setCategories(res.data)
    }

    useEffect(()=>{
        getCategory()
    },[callback])

    return {
        categories: [categories,setCategories],
        callback: [callback,setCallback]
    }
}

export default CategoriesAPI