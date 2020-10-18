const http = require("http");
const { readFile } = require("fs").promises;
const path = require("path");
const { Item } = require("../models");

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

        if (req.url === "/items/new") {
            const html = await readFile("./views/add-item.html");
            res.setHeader("Content-Type", `text/html`);
            res.statusCode = 200;
            res.end(html);
            return;
        }

        let items = await Item.findAll();

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(`<div><a href="/items/new">Add a new item</a></div>
        I have ${items.length} items.`);
    } catch (err) {
        res.statusCode = 404;
        res.end();
        console.log("ERROR: ", err);
        return;
    }
});

const port = 8081;

server.listen(port, () => {
    console.log("Server running on port " + port);
});
