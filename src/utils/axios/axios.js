import axios from "axios";
const BACKAND_DOMAIN = "http://localhost:8000";
export default axios.create({
  baseURL: BACKAND_DOMAIN,
});
