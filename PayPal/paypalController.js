const paypal = require('./paypal');

async function createOrder(req, res) {
    try {
        const order = await paypal.create();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(order));
    } catch(err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Error creating order: ${err}`);
    }
}

async function captureOrder(req, res, id) {
    try {
        const data = await paypal.capture(id);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    } catch(err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Error creating order: ${err}`);
    }
}

module.exports = {
    createOrder,
    captureOrder
};