// 1. Seorang investor menginvestasikan modalnya sebesar 1 miliar ke beberapa instrumen keuangan. 350 juta ditempatkan ke deposito bank dengan keuntungan 3,5% per tahun, sedangkan 650 juta ditempatkan di obligasi negara sebesar 30% dengan keuntungan 13% per tahun, 35% ditempatkan di saham A dengan keuntungan 14,5% per tahun, dan sisanya ditempatkan di saham B dengan keuntungan 12,5% per tahun. Buatlah sebuah fungsi yang menghitung dan mencetak total uang investor setelah dua tahun.

document.write("Seorang investor menginvestasikan modalnya sebesar 1 miliar ke beberapa instrumen keuangan. 350 juta ditempatkan ke deposito bank dengan keuntungan 3,5% per tahun, sedangkan 650 juta ditempatkan di obligasi negara sebesar 30% dengan keuntungan 13% per tahun, 35% ditempatkan di saham A dengan keuntungan 14,5% per tahun, dan sisanya ditempatkan di saham B dengan keuntungan 12,5% per tahun. Buatlah sebuah fungsi yang menghitung dan mencetak total uang investor setelah dua tahun.")
document.write("<br><br>")


let moneyInvestor = 1000000000
let depositoBank = moneyInvestor * 0.35
let obligation = (moneyInvestor * 0.65) * 0.30
let sahamA = (moneyInvestor * 0.65) * 0.35
let sahamB = (moneyInvestor * 0.65) * 0.35

document.write("Uang Awal")
document.write("<br>")
document.write(`Investasi Rp. ${moneyInvestor}`)
document.write("<br><br>")
document.write(`Deposito Bank Rp. ${depositoBank}`)
document.write("<br>")
document.write(`Obligasi Negara Rp. ${obligation}`)
document.write("<br>")
document.write(`Saham A Rp. ${sahamA}`)
document.write("<br>")
document.write(`Saham B Rp. ${sahamB}`)
document.write("<br><br>")

function totalMoney(year){
    for(let i = 0; i < year; i++){
        
        //sum profit deposito
        depositoBank += depositoBank * 0.035
        totalProfitDeposito = depositoBank

        //sum profit obligation
        obligation += obligation * 0.13
        totalProfitObligation = obligation

        //sum profit saham A
        sahamA += sahamA * 0.145
        totalProfitSahamA = sahamA

        //sum progit saham B
        sahamB += sahamB * 0.125
        totalProfitSahamB = sahamB


        document.write(`Tahun ${i+1}`)
        document.write("<br>")
        document.write(`Deposito Rp. ${totalProfitDeposito}`)
        document.write("<br>")
        document.write(`Obligasi Negara Rp. ${totalProfitObligation}`)
        document.write("<br>")
        document.write(`Saham A Rp. ${totalProfitSahamA}`)
        document.write("<br>")
        document.write(`Saham B Rp. ${totalProfitSahamB}`)
        document.write("<br><br>")
    }
    return totalProfitDeposito + totalProfitObligation + totalProfitSahamA + totalProfitSahamB
}

const myMoney = totalMoney(2)
document.write(`Total uang investor Rp. ${myMoney}`)
console.log(`Rp.${myMoney}`)

