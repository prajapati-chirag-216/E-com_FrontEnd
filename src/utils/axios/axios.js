import axios from "axios";
// const BACKAND_DOMAIN = "http://localhost:8000";
// const BACKAND_DOMAIN = "https://shopzee-back.onrender.com";
const BACKAND_DOMAIN = "https://shopzee-back-production.up.railway.app";

export default axios.create({
  baseURL: BACKAND_DOMAIN,
});
