const sortOrder = "Dumbways is awesome"
let output = ""

function sortArray(arr) {
    for(let j of sortOrder) {
        let i = 0
        while(i < arr.length) {
            if(arr[i] == j) {
                output += arr[i]
                break
                }  
        i++    
        }  
    }
    return output
}

let result = sortArray(["u", "D", "m", "w", "b", "a", "y", "s", "i", "s", "w", "a", "e", "s", "e", "o", "m"," " ," "])
console.log(result)

document.write(result)
// document.write("<br>")
// document.write(result)
