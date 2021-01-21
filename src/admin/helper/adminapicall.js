const { API } = require("../../backend");

export const createCategory=(userId,token,category)=>
{
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
        Accept:'application/json',
        "Content-Type":'application/json',
        Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify(category)
    })
    .then((res)=>
    {
        //FIXME:TESTING HERE
    //     const contentType = res.headers.get("content-type");
    //    if (contentType && contentType.indexOf("application/json") !== -1) {
    //        alert('received as json');
    //     }
         console.log(res);
        return res.json();
    })
    .catch((err)=>console.log('error in admin api call',err))
}
export const getAllCategories=()=>{
    return fetch(`${API}/categories`,{
        method:'GET'
    })
    .then((res)=>res.json())
    .catch((err)=>console.log(err))
}
//PRODUCT CALLS

 export const createProduct=(userId,token,product)=>{
     return fetch(`${API}/product/create/${userId}`,{
         method:'POST',
         headers:{
            //Accept:'application/json',
            Authorization:`Bearer ${token}`,
        },
        body:product
     })
     .then((res)=>res.json())
     .catch((err)=>console.log(err))

 }
 export const getAllProducts=()=>{
    return fetch(`${API}/products`,{
        method:'GET'
    })
    .then((res)=>res.json())
    .catch((err)=>console.log(err))
}
export const getProduct=(productId)=>{
return fetch(`${API}/product/${productId}`,{
    method:"GET"
})
.then((res)=>res.json())
.catch((err)=>console.log(err))
}
export const updateProduct=(productId,userId,token,product)=>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:'PUT',
        headers:{
           Accept:'application/json',
           Authorization:`Bearer ${token}`,
       },
       body:product
    })
    .then((res)=>res.json())
    .catch((err)=>console.log(err))

}
export const deleteProduct=(userId,token,productId)=>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:'DELETE',
        headers:{
           Accept:'application/json',
           Authorization:`Bearer ${token}`,
       },
    })
    .then((res)=>res.json())
    .catch((err)=>console.log(err))
}
export const deleteCategory=(userId,token,categoryId)=>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:'DELETE',
        headers:{
           Accept:'application/json',
           Authorization:`Bearer ${token}`,
       },
    })
    .then((res)=>res.json())
    .catch((err)=>console.log(err))   
}
export const updateCategory=(userId,token,category,categoryId)=>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"PUT",
        headers:{
        Accept:'application/json',
        "Content-Type":'application/json',
        Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify(category)
    })
    .then((res)=>
    {
        //FIXME:TESTING HERE
    //     const contentType = res.headers.get("content-type");
    //    if (contentType && contentType.indexOf("application/json") !== -1) {
    //        alert('received as json');
    //     }
         console.log(res);
        return res.json();
    })
    .catch((err)=>console.log('error in admin api call',err))

}
export const waittoRedirect=()=>{

    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },2000);
    })

}