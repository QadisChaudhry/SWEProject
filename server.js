import express from "express";
import * as paypal from "./paypal.js";

const app = express();

app.use(express.static("./"));

app.get("/", function (_, res) {
    res.render("index", {});
});

app.post("/api/orders", async (_, res) => {
    const order = await paypal.createOrder();
    res.json(order);
});

app.post("/api/orders/:orderId/capture", async (req, res) => {
    const { orderId } = req.params;
    const captureData = await paypal.capturePayment(orderId);
    res.json(captureData);
});

var port = 3000;
app.listen(port, function() {
    console.log(`Express server listening on port ${port} in ${app.settings.env} mode`)
});
