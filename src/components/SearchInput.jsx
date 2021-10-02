import styled from "styled-components";
import colors from "../lib/colors";
import { useHistory } from "react-router-dom";

import {useCallback, useState} from "react";

const Search = styled.input`
  width: 100%;
  height: 54px;
  border: solid 2px ${colors.borderColor};
  border-radius: 30px;
  box-sizing: border-box;
  font-size: 20px;
  padding: 0 27px;

  &:focus {
    outline: none;
    border-color: ${colors.highlightColor};
    color: ${colors.highlightColor};
  }
`

const SearchInput = () => {
  const history = useHistory();
  const [query, setQuery] = useState("")

  const handleQuery = useCallback((e) => {
    setQuery(e.target.value)
  }, [])

  const handleEnter = (e)=> {
    if(e.key === "Enter")
      history.push(`/result?query=${query}`)
  }

  return (
    <Search
      type="text"
      placeholder="검색"
      onChange={handleQuery}
      onKeyDown={handleEnter}
    />
  );
}
export default SearchInput;