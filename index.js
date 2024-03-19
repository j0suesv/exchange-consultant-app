import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const API_URL = "https://api.blockchain.com/v3/exchange/tickers/"

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
       const result = await axios.get(API_URL+"BTC-USD") 
       res.render("index.ejs", {result: result.data.price_24h});
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
      }
    
})

app.post("/calculate", async (req, res) => {
    let value1 = req.body["value1"];
    let coin1 = req.body["coin1"];
    let coin2 = req.body["coin2"];
    let conversionURL = coin1 + "-" + coin2;
    try {
        const result = await axios.get(API_URL+conversionURL);
        let exchangeRate = result.data.price_24h;
        let totalValue = exchangeRate * Number(value1)
        res.render("index.ejs", {result: totalValue, value1: value1, coin1: coin1});
     } catch (error) {
         console.log(error.response.data);
         res.status(500);
       }
     
})

app.listen(port, ()=>{
    console.log(`listening on port: ${port}`);
})