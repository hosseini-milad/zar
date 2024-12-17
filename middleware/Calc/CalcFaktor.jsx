const CalcFaktor=(sale,purchase,payment,debit)=>{
    var totalSale=0
    var totalPurchase=0
    var totalPay=0
    var totalDebit = 0

    for(var i=0;i<sale.length;i++){
        totalSale += sale[i].price
    }
    for(var i=0;i<purchase.length;i++){
        totalPurchase += purchase[i].price
    }
    for(var i=0;i<payment.length;i++){
        totalPay += payment[i].price
    }

    return({totalSale,totalPurchase,totalPay,totalDebit})
}

module.exports =CalcFaktor