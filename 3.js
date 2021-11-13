// let string = ""

// function cetakPola(val) {
//     for(let i = 1; i <= val; i++) {
//         for(let j = 1; j < i; j++) {
//             string += " "
//         }
//         for(let k = val; k >= (2 * i - val); k--) {
//             if(k % 2 == 0) {
//                 string += " "
//             } else if (k % 2 != 0) {
//                 if(i % 2 == 1) {
//                     string += k
//                 } else {
//                     string += k
//                 }
//             }
//         }
//         string += "\n"
//     }
//     return string
// }

// const cetak = cetakPola(5)
// console.log(cetak)
                

let string = ""

function cetakPola(val) {
    for(let i = 1; i <= val; i++) {
        for(let j = 1; j < i; j++) {
            string += " "
        }
        for(let k = 0; k >=  i - val; k--) {
            if(i % 2 == 1) {
                if(i == 3 || i == 7 || i == 11 || i == 15 || i == 19) {
                    if(k % 2 == 0) {
                        string += "+ "
                    } else {
                        string += "# "
                    }
                } else {
                    if(k % 2 == 0) {
                        string += "# "
                    } else {
                        string += "+ "
                    }
                }

            } else {
                string += "+ "
            }
        }
        string += "\n"
    }
    return string
}

const cetak1 = cetakPola(5)
const cetak2 = cetakPola(9)
const cetak3 = cetakPola(13)
console.log(cetak1)
console.log(cetak2)
console.log(cetak3)




// let n = 5;
// let string = "";
// // External loop
// for (let i = 0; i < n; i++) {
//   // printing spaces
//   for (let j = 0; j < i; j++) {
//     string += " ";
//   }
//   // printing star
//   for (let k = 0; k < 2 * (n-i) - 1; k++) {
//     if(k % 2 == 1) {
//         string += " "
//     } else {
//         string += k
//     } 
//   }
//   string += "\n";
// }
// console.log(string);

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
