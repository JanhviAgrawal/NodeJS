console.log("File Location :", __filename);
console.log("Directory Location :", __dirname);


let isLoader = true;
let totalSecond = 30;

setTimeout(() => {
    console.log("Hello Node JS");
    isLoader = false;
}, 5000);

setInterval(() => {

    if (totalSecond == 0) {
        return;
    }
    totalSecond--;

    let minutes = Math.floor(totalSecond / 60);
    let second = totalSecond % 60;

    console.log(`${minutes} : ${second}`);

}, 1000);