import React, {useState,useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../../GlobalState'
import {useParams} from 'react-router-dom'

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: 'This is the new product',
    content: 'This is the new product',
    category: '',
    _id: ''
}

const CreateProduct = () => {
    const state = useContext(GlobalState)
    const [product,setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images,setImages] = useState(false)
    const [admin] = state.userAPI.admin
    const [accessToken] = state.token
    const [products] = state.productsAPI.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback]  = state.productsAPI.callback

    const params = useParams()
    useEffect(()=>{
        if(params.id){
            setOnEdit(true)
            products.forEach(item =>{
                if(params.id === item._id){
                    setProduct(item)
                    setImages(item.images)
                }
            })
        }
        else{
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    },[params.id, products])

    const handleUpload = async (event) =>{
        event.preventDefault()
        try{
            if(!admin){
                return alert("Administrator resource")}
                const file = event.target.files[0]
                if(!file) return alert("Image not exist")
                if(file.size > 2048*2048) return alert("Size too large")
                if (file.type !== 'image/jpeg' && file.type !== 'image/png') return alert("Image is not valid")
            
                let formData = new FormData()
                formData.append('file',file)


                const res = await axios.post('/api/uploadImage', formData,{
                    headers: { 'content-type': 'multipart/form-data', Authorization: accessToken }
                })
                setImages(res.data)
        }catch(error){
            alert(error.response.data.msg)
        }
    }

    const handleDeleteImages = async () => {
        try {
            if (!admin) return alert("Administrator resource.")
            await axios.post('/api/deleteImage', { public_id: images.public_id }, {
                headers: { Authorization: accessToken }
            })
            setImages(false)
        }
        catch(error){
            alert(error.response.data.msg)
        }
    }

    const handleOnchange = event =>{
        setProduct({...product,[event.target.name]:event.target.value})
    }

    const handleSubmit = async event => {
        event.preventDefault()
        try {
            if (!admin) return alert("You are not admin")
            if (!images) return alert("Please upload imag")

            if (onEdit) {
                await axios.put(`/api/products/${product._id}`, { ...product, images }, {
                    headers: { Authorization: accessToken }
                })
                window.location.href = "/"
            } else {
                await axios.post("/api/products", { ...product, images }, {
                    headers: { Authorization: accessToken }
                })
                window.location.reload()
            }

            setImages(false)
            setProduct(initialState)
            setCallback(!callback)

        }catch(error){
            alert(error.response.data.msg)
        }
    }

    const styleUpload  = {
        display: images? 'block':"none"
    }

    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload} />
                <div id="file_img" style={styleUpload}>
                    <img src={images ? images.url : ''} alt="" />
                    <span onClick={handleDeleteImages}>X</span>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" id="product_id" required value={product.product_id} onChange={handleOnchange} disabled={onEdit} />
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required value={product.title} onChange={handleOnchange} />
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required value={product.price} onChange={handleOnchange} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required value={product.description} rows="7" onChange={handleOnchange} />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required value={product.content} rows="7" onChange={handleOnchange} />
                </div>

                <div className="row">
                    <label htmlFor="category">Category </label>
                    <select name="category" value={product.category} onChange={handleOnchange}>
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button className="button-update" type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>
        </div>
    )
}


export default CreateProduct