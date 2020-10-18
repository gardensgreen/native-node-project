const http = require("http");
const { readFile } = require("fs").promises;
const path = require("path");

const server = http.createServer(async (req, res) => {
    try {
        if (req.url.startsWith("/images")) {
            const imageFilePath = "./assets" + req.url;
            const imageFileContents = await readFile(imageFilePath);
            res.statusCode = 200;
            const extension = path.extname(imageFilePath).substring(1);
            res.setHeader("Content-Type", `image/${extension}`);
            res.end(imageFileContents);
            return;
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("I have items.");
    } catch (err) {
        console.log("ERROR: ", err);
    }
});

const port = 8081;

server.listen(port, () => {
    console.log("Server running on port " + port);
});
