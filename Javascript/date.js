const todayDate = new Date();
console.log(todayDate);
console.log(todayDate.toString());
console.log(todayDate.toDateString());
console.log(todayDate.toISOString());
console.log(todayDate.toJSON());
console.log(todayDate.toLocaleDateString());
console.log(todayDate.toLocaleString());

function printDateArr(){
    const dateArr = todayDate.toLocaleDateString().toString().split('/');
    console.log(`Day: ${dateArr[1]} Month: ${dateArr[0]} Year: ${dateArr[2]}`);
}
printDateArr();