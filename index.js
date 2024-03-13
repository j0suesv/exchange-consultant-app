import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://api.blockchain.com/v3/exchange/tickers/"

app.use(express.static("public"));

app.get("/", async (req, res) => {
    const coin1 = req.body.coin1;
    console.log(coin1)
    try {
       const result = await axios.get(API_URL+"BTC-USD") 
       console.log(result.data.price_24h);
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
      }
    res.render("index.ejs");
})

app.listen(port, ()=>{
    console.log(`listening on port: ${port}`);
})