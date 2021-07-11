import axios from "axios";
import BackendUrl from '../backendUrl'

const GetCatList =()=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/CategoryList')
}

const GetSubCatList =()=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/SubCategoryList')
}

const GetProductList =()=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/ProductList')
}

const CreateCat =(probs)=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/CreateCategory',{title:probs.title})
}

const CreateSubCat =(probs)=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/CreateSubCategory',{category_id:probs.id, title:probs.title})
}

const CreateProduct =(probs)=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/CreateProduct',{subcategory_id:probs.id, title:probs.title, quantity:"0"})
}

const EditCat =(probs)=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/EditCategory',{category_id:probs.id, title:probs.title})
}

const EditSubCatTitle =(probs)=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/EditSubCategory',{subcategory_id:probs.id, title:probs.title})
}

const EditSubCatCat =(probs)=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/EditSubCategory',{subcategory_id:probs.id, category_id:probs.catid})
}

const EditProductSubCat =(probs)=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/EditProduct',{subcategory_id:probs.subcatid, product_id:probs.id})
}

const EditProductCount =(probs)=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/EditProduct',{quantity:probs.count, product_id:probs.id})
}

const EditProductTitle =(probs)=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/EditProduct',{product_id:probs.id, title:probs.title})
}

const DeleteCat =(probs)=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/DeleteCategory',{id:probs.id})
}
const DeleteSubCat =(probs)=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/DeleteSubCategory',{id:probs.id})
}
const DeleteProduct =(probs)=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/DeleteProduct',{id:probs.id})
}

const GetDataAnalysis =(probs)=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/DataAnalyze',{})
}



export {EditProductCount,DeleteCat,DeleteSubCat,DeleteProduct,GetCatList,GetSubCatList,GetProductList,CreateSubCat,CreateProduct,CreateCat,EditCat,EditSubCatTitle,EditSubCatCat,EditProductTitle,EditProductSubCat,GetDataAnalysis}