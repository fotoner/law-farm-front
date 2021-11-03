import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Helmet from "react-helmet";

import styled from "styled-components";
import queryString from "query-string";
import colors from "../lib/colors";
import useDocumentApi from "../hooks/api/useDocumentApi";

const Result = styled.div`
  margin-top: 72px;
  width: 100%;
  max-width: 700px;
`;
const Title = styled.div`
  font-size: 48px;
  color: ${colors.highlightColor};
`;

const ResultContainer = styled.div`
  margin-top: 48px;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const ResultItem = styled.div`
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  padding: 20px;
  box-shadow: 0 2px 10px -5px black;
  border-radius: 20px;

  margin-bottom: 30px;
  width: 100%;
  //height: 300px;

  .title {
    color: ${colors.highlightColor};

    font-size: 24px;
  }

  .content {
    display: flex;
    .paragraphCount {
      margin-left: 8px;
      color: ${colors.fontGrey};
    }
  }
`;

const DetailLink = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  font-size: 24px;
  transform: translateY(-50%);
  color: ${colors.highlightColor};
`;

const SearchResult = () => {
  const location = useLocation();
  const [query, setQuery] = useState(null);
  const [document, setDocument] = useState(null);
  const { searchDocument } = useDocumentApi();

  useEffect(() => {
    const parse = queryString.parse(location.search);
    setQuery(parse.query);
  }, [location]);

  useEffect(() => {
    const requestSearch = async () => {
      const res = await searchDocument(query);
      setDocument(res);
    };

    if (query) {
      requestSearch();
    }
  }, [query]);

  return (
    <Result>
      <Title>'{query}' 검색결과</Title>
      <Helmet title={`'${query}' 검색결과 - 로우팜`} />
      <ResultContainer>
        {document &&
          document.result.map((val, idx) => (
            <ResultItem key={idx}>
              <Link to={`/article/@${val.name}`}>
                <div className="title">{val.name}</div>
                <div className="content">
                  <div className="type">
                    {val.about.text.length > 0
                      ? val.about.text.match(/(\((.*?)\)| 삭제 <(.*?)>)/g)[0]
                      : val.about.text}
                  </div>
                  <div className="paragraphCount">
                    {val.about.paragraphs.length > 0
                      ? `*${val.about.paragraphs.length}개의 보조항 존재*`
                      : ""}
                  </div>
                </div>
                <DetailLink>〈</DetailLink>
              </Link>
            </ResultItem>
          ))}
      </ResultContainer>
    </Result>
  );
};

export default SearchResult;
