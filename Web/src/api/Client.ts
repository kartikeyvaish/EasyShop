import { create } from "apisauce";
import Configuration from "../config/Configuration";

const apiClient = create({
  baseURL: Configuration.BaseURL,
});

export default apiClient;
