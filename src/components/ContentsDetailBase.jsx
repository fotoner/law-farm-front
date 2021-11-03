import { useParams } from "react-router-dom";
import Helmet from "react-helmet";

import styled from "styled-components";

import colors from "../lib/colors";

import useContentsDetail from "../hooks/useContentsDetail";
import useUserRecoil from "../hooks/useUserRecoil";

import RelateContents from "./RelateContents";
import { AiOutlineHeart } from "react-icons/ai";

const ArticleHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: normal;
  margin: 0;
  color: ${colors.highlightColor};
`;

const AddLike = styled.div`
  padding: 8px;
  border-radius: 36px;
  cursor: pointer;
  width: 36px;
  height: 36px;
  font-weight: bold;
  color: ${colors.highlightColor};
  transition: color 0.3s, background-color 0.3s;
  &:hover {
    background-color: ${colors.like}0f;
    color: ${colors.like};
  }
`;

const SubTitle = styled.div`
  width: 100%;
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: solid 1px ${colors.borderColor};
  font-size: 24px;
`;

const ContentsBody = styled.div`
  margin-top: 100px;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  box-shadow: 0 2px 10px -5px black;
  border-radius: 20px;
`;

const Text = styled.div`
  word-break: keep-all;
`;

const Paragraph = styled.div`
  margin: 40px 0;
`;

const ContentsDetailBaes = ({ contentsType }) => {
  const { key } = useParams();
  const { user } = useUserRecoil();
  const [contents] = useContentsDetail({
    contentsType: contentsType,
    contentsKey: key,
  });

  return (
    <div>
      <Helmet>
        <title>{key} - 로우팜</title>
      </Helmet>
      <ContentsBody>
        <ArticleHeader>
          <Title>{key}</Title>
          {user && (
            <AddLike>
              <AiOutlineHeart size={36} />
            </AddLike>
          )}
        </ArticleHeader>
        <Text>
          {contents &&
            (contents.result.text.length > 0
              ? contents.result.text.match(/(\((.*?)\)| 삭제 <(.*?)>)/g)[0]
              : contents.result.text)}
        </Text>
        {contents &&
          contents.result.paragraphs.length > 0 &&
          contents.result.paragraphs.map((val, idx) => (
            <Paragraph key={idx}>
              <SubTitle>{val.paragraph}</SubTitle>
              <Text>{val.text.replace(contents.result.text, "")}</Text>
            </Paragraph>
          ))}
      </ContentsBody>

      {contents && <RelateContents docKey={key} target={contentsType} />}
    </div>
  );
};

export default ContentsDetailBaes;
