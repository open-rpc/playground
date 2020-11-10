import { useState, useEffect, Dispatch } from "react";
import { isEmpty } from "lodash";
import fetchUrlSchemaFile from "../fetchUrlSchemaFile";
import fetchSchemaFromRpcDiscover from "../fetchSchemaFromRpcDiscover";

interface ISearchBarResponse {
  results: any;
  error: string | undefined;
}

const useSearchBar = (defaultValue: string | undefined): [string | undefined, Dispatch<any>] => {
  const [searchUrl, setSearchUrl] = useState<string | undefined>(defaultValue);
  return [searchUrl, setSearchUrl];
};

export default useSearchBar;
