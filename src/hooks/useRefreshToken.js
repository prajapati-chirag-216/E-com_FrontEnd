import { useDispatch } from "react-redux";
import { getAccessToken } from "../utils/api";
import { setAccessToken } from "../store/ui/ui.action";

export const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refresh = async () => {
    const response = await getAccessToken();
    dispatch(setAccessToken(response.accessToken));
  };
  return refresh;
};
export default useRefreshToken;
