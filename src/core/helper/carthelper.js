export const addItemToCart=(item,next)=>{
let cart=[];
if(typeof window !== undefined)
{
    if(localStorage.getItem("cart"))
    {
        cart=JSON.parse(localStorage.getItem("cart"))
    }
    cart.push({
        ...item
    })
    localStorage.setItem('cart',JSON.stringify(cart));
    next();
}
}

export const loadCart=()=>{
    if(typeof window !== undefined)
{
    if(localStorage.getItem("cart"))
    {
        return JSON.parse(localStorage.getItem("cart"))
    }
}
}

export const removeItemfromCart=(productId)=>{
    let cart=[];
    if(typeof window !== undefined)
    {
        if(localStorage.getItem("cart"))
        {
            cart=JSON.parse(localStorage.getItem("cart"))
        }
    }
    cart=cart.filter(prod=>prod._id!==productId);
    localStorage.setItem("cart",JSON.stringify(cart));
}