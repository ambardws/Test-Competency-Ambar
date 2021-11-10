const sortOrder = "Dumbways is awesome"
let output = ""


function sortArray(arr) {
    for(let j of sortOrder) {
        for(let i = 0; i < arr.length; i++) {
            if(arr[i] == j) {
                output += arr[i]
                document.write(output)
                document.write("<br>")
                break
            }      
        } 
    }
    return output
}

let result = sortArray(["u", "D", "m", "w", "b", "a", "y", "s", "i", "s", "w", "a", "e", "s", "e", "o", "m"," " ," "])
console.log(result)
document.write("<br>")
document.write(result)
