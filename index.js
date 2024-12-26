require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

console.log("Testing");

const SWIGGY_API =
  "https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=27.3965071&lng=80.1250479&carousel=true&third_party_vendor=1";

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/option-chain", async (req, res) => {
  const symbol = req.query.symbol || "NIFTY";
  const url = `https://www.nseindia.com/api/option-chain-indices?symbol=${symbol}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "en-US,en;q=0.9",
        Accept: "application/json",
        Referer: "https://www.nseindia.com/option-chain",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data from NSE");
  }
});

app.get("/restaurants", async (req, res) => {
  try {
    const response = await axios.get(SWIGGY_API, {
      headers: {
        __fetch_req__: "true",
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9,hi;q=0.8",
        "content-type": "application/json",
        cookie:
          "__SW=XZBurDF-XTCG7fYMh4JMp6C-LsNm3KTX; _guest_tid=08cff768-8073-4e3c-b7f8-46d98db04689; _device_id=1bafa6fb-37cc-420a-6ca1-d5fb663e91f3; ...", // Replace with updated cookies if needed
        "user-agent":
          "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.log(error);
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch data from Swiggy" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
