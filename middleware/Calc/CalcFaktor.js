const NormalNumber = require("../NormalNumber")

const CalcFaktor=(sale,purchase,payment,debit,off)=>{
    var totalSale=0
    var totalSaleWeight=0
    var totalPurchase=0
    var totalPay=0
    var totalTax =0
    var totalDebitRaw = debit&&debit.MandeHesab&&debit.MandeHesab[0]&&
    debit.MandeHesab[0].MandeyeKolBePool
    var totalDebit =NormalNumber(totalDebitRaw)
    var totalOff = NormalNumber(off)

    for(var i=0;i<sale.length;i++){
        totalSale += NormalNumber(sale[i].price)
        totalSaleWeight += NormalNumber(sale[i].priceDetail&&
            sale[i].priceDetail.weight)
        totalTax += NormalNumber(sale[i].priceDetail&&
            sale[i].priceDetail.taxPrice) 
    }
    for(var i=0;i<purchase.length;i++){
        totalPurchase += NormalNumber(purchase[i].price)
    }
    for(var i=0;i<payment.length;i++){
        totalPay += NormalNumber(payment[i].payValue)
    }
    const totalRemain = totalSale-totalPurchase-totalPay+
        totalDebit-totalOff
    return({totalSale,totalPurchase,totalPay,totalSaleWeight,totalTax,
        totalOff,totalDebit:totalDebit,totalRemain})
}

module.exports =CalcFaktor