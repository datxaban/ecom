import {useState,useEffect} from 'react'
import axios from 'axios'

const ProductsAPI = () =>{

    const [products,setProducts] = useState([])
    const [callback,setCallback] = useState(false)
    const [category,setCategory] = useState(false)
    const [sort,setSort] = useState('')
    const [search,setSearch] = useState('')
    const [page,setPage] = useState(1)
    const [result,setResult] = useState(0) //number of product

    
    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get(`/api/products?limit=${page * 15}&${category}&${sort}&title[regex]=${search}`)

            //get product list base on page,sort,categories and search
            setProducts(res.data.products)

            setResult(res.data.result)

        }
        getProducts()
    }, [callback, category, sort, page, search])


    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        category:[category, setCategory],
        sort:[sort, setSort],
        page:[page, setPage],
        search:[search, setSearch],
        result:[result, setResult]
    }
    
}

export default ProductsAPI