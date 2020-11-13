import { useState, Dispatch } from "react";

interface ISearchBarResponse {
  results: any;
  error: string | undefined;
}

const useSearchBar = (defaultValue: string | undefined): [string | undefined, Dispatch<any>] => {
  const [searchUrl, setSearchUrl] = useState<string | undefined>(defaultValue);
  return [searchUrl, setSearchUrl];
};

export default useSearchBar;
