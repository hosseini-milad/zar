
const UpdateCartQuery = require("./UpdateCartQuery");

const UpdateCartInline=async(cartItems,price)=>{
    var query=[]
        console.log(cartItems)
    for(var i=0;i<cartItems.length;i++){
        const cartItem = cartItems.cart[i]
        const priceDetail = await UpdateCartQuery(cartItem,price)

        query.push({
            priceDetail,
            fullPrice:priceDetail.finalPrice,
            unitPrice:price
        })
    }
    return(query)
}

module.exports =UpdateCartInline