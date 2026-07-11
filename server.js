const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

const WEBHOOK = "https://b24-voge55.bitrix24.ru/rest/1/wy5kogomjt3eu8tq/";

app.get("/photo/:productId", async (req, res) => {

    try {

        const response = await axios.get(
            WEBHOOK + "crm.product.get.json?id=" + req.params.productId
        );

        const product = response.data.result;

        if (
            !product.PROPERTY_44 ||
            product.PROPERTY_44.length === 0
        ) {
            return res.status(404).send("No photo");
        }

        const photo =
            "https://b24-voge55.bitrix24.ru" +
            product.PROPERTY_44[0].value.downloadUrl;

        const image = await axios.get(photo, {
            responseType: "stream"
        });

        res.setHeader(
            "Content-Type",
            image.headers["content-type"]
        );

        image.data.pipe(res);

    } catch (e) {

        console.log(e.message);

        res.status(500).send("Error");

    }

});

app.listen(process.env.PORT || 3000, () => {

    console.log("Server started");

});
