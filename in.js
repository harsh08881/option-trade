const axios = require('axios');

const url = "https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=27.3965071&lng=80.1250479&carousel=true&third_party_vendor=1";

const headers = {
  "__fetch_req__": "true",
  "accept": "*/*",
  "accept-language": "en-US,en;q=0.9,hi;q=0.8",
  "content-type": "application/json",
  "cookie": "__SW=XZBurDF-XTCG7fYMh4JMp6C-LsNm3KTX; _guest_tid=08cff768-8073-4e3c-b7f8-46d98db04689; _device_id=1bafa6fb-37cc-420a-6ca1-d5fb663e91f3; ...",
  "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36"
};

axios.get(url, { headers })
  .then(response => {
    console.log("Data fetched successfully:", response.data);
  })
  .catch(error => {
    console.error("Error fetching data:", error.message);
    if (error.response) {
      console.error("Response Status:", error.response.status);
      console.error("Response Data:", error.response.data);
    }
  });
