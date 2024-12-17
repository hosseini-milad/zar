const NormalNumber = require("../NormalNumber")

const CalcFaktor=(sale,purchase,payment,debit)=>{
    var totalSale=0
    var totalSaleWeight=0
    var totalPurchase=0
    var totalPay=0
    var totalDebitRaw = debit&&debit.MandeHesab&&debit.MandeHesab[0]&&
    debit.MandeHesab[0].MandeyeKolBePool
    var totalDebit =NormalNumber(totalDebitRaw)

    for(var i=0;i<sale.length;i++){
        totalSale += NormalNumber(sale[i].price)
        totalSaleWeight += NormalNumber(sale[i].priceDetail&&
            sale[i].priceDetail.weight)
    }
    for(var i=0;i<purchase.length;i++){
        totalPurchase += NormalNumber(purchase[i].price)
    }
    for(var i=0;i<payment.length;i++){
        totalPay += NormalNumber(payment[i].payValue)
    }
    const totalRemain = totalSale-totalPurchase-totalPay-totalDebit
    return({totalSale,totalPurchase,totalPay,
        totalDebit:totalDebit,totalRemain})
}

module.exports =CalcFaktor