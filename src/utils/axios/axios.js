import axios from "axios";
// const BACKAND_DOMAIN = "http://localhost:8000";
const BACKAND_DOMAIN = "https://www.shopzeee.shop";

export default axios.create({
  baseURL: BACKAND_DOMAIN,
});
