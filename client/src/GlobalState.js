import axios from 'axios'
import React, {createContext ,useEffect,useState} from 'react'
import UserAPI from './api/UserAPI'
import ProductsAPI from './api/ProductAPI';
import CategoriesAPI from './api/CategoriesAPI';


export const GlobalState = createContext();

export const DataProvider = ({children}) => {

    const [token,setToken] = useState(false) //Authentication
    

    useEffect(()=>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin) {
            const refreshToken = async () => {
                const res = await axios.get("/user/refresh_token")
                setToken(res.data.accesstoken)
                setTimeout(()=>{
                    refreshToken()
                },10*60*1000)
            }
            refreshToken()
        }
    },[])
    
    const state = {
        token: [token,setToken], //token data
        productsAPI: ProductsAPI(), //product data
        userAPI: UserAPI(token),// User data
        categoriesAPI: CategoriesAPI()
    }

    return (
        <GlobalState.Provider value = {state}>
            {children}
        </GlobalState.Provider>
    )
}