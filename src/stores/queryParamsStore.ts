import { createStore } from "reusable";
import useQueryParams from "../hooks/useQueryParams";

export default createStore(() => {
  return useQueryParams();
});
