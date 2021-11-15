import { Link } from "react-router-dom";

import styled from "styled-components";
import colors from "../lib/colors";

const ResultBox = styled.div`
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

const ResultContainer = ({articleList}) => {
  return (
    <ResultBox>
      {articleList &&
        articleList.map((val, idx) => (
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
    </ResultBox>
  );
};

export default ResultContainer;
