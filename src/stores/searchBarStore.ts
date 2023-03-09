import { createStore } from "reusable";
import useSearchBar from "../hooks/useSearchBar";
import queryParamStore from "./queryParamsStore";

export default createStore(() => {
  const [query] = queryParamStore();

  return useSearchBar(query.schemaUrl || query.url || process.env.REACT_APP_DEFAULT_SCHEMAURL);
});
