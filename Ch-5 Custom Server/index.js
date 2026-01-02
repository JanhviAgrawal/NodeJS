const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        return;
    }

    const msg = `New User ${new Date()} Page : ${req.url} IP Address : ${req.socket.remoteAddress}\n`;
    fs.appendFile("./log.txt", msg, (err) => { });

    console.log(req.url);

    if (req.url === '/style.css') {
        fs.readFile("style.css", (err, data) => {
            res.end(data);
        });
        return;
    }


    let fileName = "";

    switch (req.url) {
        case '/':
            fileName = "index.html";
            break;

        case '/about':
            fileName = "about.html";
            break;

        case '/contact':
            fileName = "contact.html";
            break;

        default:
            fileName = "404.html";
            break;
    }

    fs.readFile(fileName, (err, result) => {
        res.end(result);
    })
});

server.listen(8000, (err) => {
    if (err) {
        console.log("Server is not Started...");
        return false;
    }
    console.log("Server is Starting...");
});