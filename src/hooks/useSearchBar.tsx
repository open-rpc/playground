import { useState, useEffect, Dispatch } from "react";
import { isEmpty } from "lodash";
import fetchUrlSchemaFile from "../fetchUrlSchemaFile";
import fetchSchemaFromRpcDiscover from "../fetchSchemaFromRpcDiscover";

interface ISearchBarResponse {
  results: any;
  error: string | undefined;
}

const useSearchBar = (defaultValue: string | undefined): [string | undefined, ISearchBarResponse, Dispatch<any>] => {
  const [searchUrl, setSearchUrl] = useState<string | undefined>(defaultValue);
  const [results, setResults] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    if (!searchUrl) {
      return;
    }
    if (isEmpty(searchUrl)) {
      return;
    }
    if (searchUrl.match(/\.json$/)) {
      fetchUrlSchemaFile(searchUrl)
        .then(setResults)
        .catch((e) => {
          const msg = `Error fetching schema for: ${searchUrl}`;
          console.error(msg, e);
          setError(msg);
        });
    } else {
      fetchSchemaFromRpcDiscover(searchUrl)
        .then(setResults)
        .catch((e) => {
          const msg = `Error fetching rpc.discover for: ${searchUrl}`;
          console.error(msg, e);
          setError(msg);
        });
    }
  }, [searchUrl]);
  return [searchUrl, { results, error }, setSearchUrl];
};

export default useSearchBar;
