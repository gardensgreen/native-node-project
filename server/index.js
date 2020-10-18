const http = require("http");

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("I have items.");
});

const port = 8081;

server.listen(port, () => {
    console.log("Server running on port " + port);
});
