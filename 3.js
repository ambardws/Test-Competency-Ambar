let string = ""

function cetakPola(val) {
    for(let i = 1; i <= val; i++) {
        for(let j = 1; j < i; j++) {
            string += " "
        }
        for(let k = val; k >= (2 * i - val); k--) {
            if(k % 2 == 0) {
                string += " "
            } else if (k % 2 != 0) {
                if(i % 2 == 1 && k == 1) {
                    string += k 
                } else {
                    string += k
                }
            }
        }
        string += "\n"
    }
    return string
}



// function cetakPola(val) {
//     for(let i = 1; i <= val; i++) {
//         for(let j = val; j > i; j--) {
//             string += " "
//         }
//         for(let k = 1; k <= i; k++) {
//             string += "*"
//         }
//         string += "\n"
//     }
//     return string
// }
const cetak = cetakPola(5)
console.log(cetak)