const fs = require("fs");

// Will make a file at the provided path and Overwrite if next time "message" is passed
// Sync
fs.writeFileSync("./dox.txt", "The World should know the PAIN 🙌🏻");

// Async
fs.writeFile("./doc.txt", "Hello World", (err) => {
    if (err) {
        console.log(err);
    }
});

// If file does not exists then it will make a file and add the data without removing the previous data..
// Sync
fs.appendFileSync("./dox.txt", "\nOvera Kamii..");

// Async
fs.appendFile("./doc.txt", "\nHello World", (err) => {
    if (err) {
        console.log(err);
    }
});

// Read the File and print its data if file not found then throws error
// Sync
const result = fs.readFileSync("./doc.txt", "utf-8");
console.log(result);

// Async
fs.readFile("./dox.txt", "utf-8", (err, res) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Async : ", res);
    }
});

// removes file from the Directory
fs.unlinkSync();
fs.unlink();

// copy one file to another file
fs.copyFileSync();
fs.copyFile();