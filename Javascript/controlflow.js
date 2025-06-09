// const coding = ["Java","Js","Ruby","C++"]

// coding.forEach((item)=>{
//     console.log(item);
    
// })

// const myNums = [1,2,3,4,5,6]

// // const result = myNums.filter( (num) => {
// //     num = num*20000;
// //     if (num > 70000) return num;
// // } );


// const result = myNums.reduce( (accumulator,sum )=> ( accumulator+sum),0 )

// console.log(result);

const shoppingCart = [
    {
        ItemName: "Js Course",
        Price: 399
    },
    {
        ItemName: "Java Course",
        Price: 499
    },
    {
        ItemName: "Py Course",
        Price: 99
    },
    {
        ItemName: "Ruby Course",
        Price: 399
    }
]

const sum = shoppingCart.reduce( (acc,currval) => acc+currval.Price,0 )

console.log(sum);

