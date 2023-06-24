import axios from "axios";
const BACKAND_DOMAIN = "http://192.168.43.125:8000";
// const BACKAND_DOMAIN = "https://www.shopzeee.shop";

export default axios.create({
  baseURL: BACKAND_DOMAIN,
});
