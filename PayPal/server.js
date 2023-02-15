const http = require("http")
const fs = require("fs");
const url = require("url");

var paypal = require("./paypal.js");

const server = http.createServer((req, res) => {
    let captureUrl = url.parse(req.url).pathname.match(/^\/api\/orders\/([^\/]+)\/capture$/);
    if (req.url === "/script.js") {
        fs.readFile(`./public/script.js`, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end(err.message);
            } else {
                res.writeHead(200);
                res.end(data);
            }
        });
    } else if (req.url === "/api/orders" && req.method == "POST") {
        paypal.createOrder()
            .then(order => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(order));
            })
            .catch(error => {
                res.statusCode = 500;
                res.setHeader("Content-Type", "text/plain");
                res.end(`Error creating order: ${error}`);
            });
    } else if (captureUrl != null && req.url === captureUrl[0] && req.method == "POST") {
        const orderId = captureUrl[1];
        console.log(orderId);
        paypal.capturePayment(orderId)
            .then(data => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(data));
            })
            .catch(error => {
                res.statusCode = 500;
                res.setHeader("Content-Type", "text/plain");
                res.end(`Error creating order: ${error}`);
            });
    } else {
        fs.readFile(`./public/index.html`, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end(err.message);
            } else {
                res.writeHead(200);
                res.end(data);
            }
        });
    }
});

var port = 3000;
server.listen(port, function() {
    console.log(`Server listening on port ${port} http://localhost:3000`)
});
