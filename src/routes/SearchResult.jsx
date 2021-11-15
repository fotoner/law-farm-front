import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Helmet from "react-helmet";

import styled from "styled-components";
import queryString from "query-string";
import colors from "../lib/colors";
import useDocumentApi from "../hooks/api/useDocumentApi";
import ResultContainer from "../components/ResultContainer";

const Result = styled.div`
  margin-top: 72px;
  width: 100%;
  max-width: 700px;
`;
const Title = styled.div`
  font-size: 48px;
  color: ${colors.highlightColor};
  margin-bottom: 32px;
`;

const SearchResult = () => {
  const location = useLocation();
  const [query, setQuery] = useState(null);
  const [articleList, setArticleList] = useState(null);
  const { searchDocument } = useDocumentApi();

  useEffect(() => {
    const parse = queryString.parse(location.search);
    setQuery(parse.query);
  }, [location]);

  useEffect(() => {
    const requestSearch = async () => {
      const res = await searchDocument(query);
      setArticleList(res);
    };

    if (query) {
      requestSearch();
    }
  }, [query]);

  return (
    <Result>
      <Title>'{query}' 검색결과</Title>
      <Helmet title={`'${query}' 검색결과 - 로우팜`} />
      { articleList && <ResultContainer articleList={articleList.result}/> }
    </Result>
  );
};

export default SearchResult;
