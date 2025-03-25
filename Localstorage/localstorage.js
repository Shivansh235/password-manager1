

// if(localStorage.getItem("name")){
//     let a = localStorage.getItem("name");
//     document.write("Welcome" +a);
// }

// else {
//     let a = prompt("Enter Your name:");
//     localStorage.setItem("name",a);
//     document.write("welcome"+a)
// }


// Can we store a object in the localstorage-> the answer is yes!

// Remember one thing localstorage always store sting so first u convert ur obj into string then convert into obj.

let obj = {
    "LordKrishna":1,
    "shivansh":2,
    "Divyansh":3
}

let b= JSON.stringify(obj);
console.log(b)

localStorage.setItem("guys",b)

localStorage.getItem("guys")

JSON.parse(localStorage.getItem("guys")) // convert string into object.