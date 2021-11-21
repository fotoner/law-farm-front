import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Helmet from "react-helmet";

import styled from "styled-components";

import colors from "../lib/colors";

import useContentsDetail from "../hooks/useContentsDetail";
import useUserRecoil from "../hooks/auth/useUserRecoil";
import useBookmarkApi from "../hooks/api/useBookmarkApi";

import RelateContents from "./RelateContents";
import LikeButton from "./input/LikeButton";

const Article = styled.div`
  max-width: 1024px;
  width: 100%;
`;

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
  //word-break: keep-all;
`;

const Paragraph = styled.div`
  margin: 40px 0;
`;

const ParseNewLine = (text) => {
  const parsedLine = text.split("\n");

  return (
    <div>
      {parsedLine.map((val, idx) => (
        <p key={idx}>{val}</p>
      ))}
    </div>
  );
};

const ContentsDetailBass = ({ contentsType }) => {
  const { key } = useParams();
  const { user } = useUserRecoil();
  const { getBookmark } = useBookmarkApi();
  const [isBookmark, setIsBookmark] = useState(false);

  const [contents] = useContentsDetail({
    contentsType: contentsType,
    contentsKey: key,
  });

  useEffect(() => {
    const getBookmarkInfo = async () => {
      const res = await getBookmark(key, contentsType);

      setIsBookmark(!!res);
    };

    if (user) {
      getBookmarkInfo();
    }
  }, [user, key, contentsType]);

  return (
    <Article>
      <Helmet>
        <title>{key} - 법률 - 로우팜</title>
      </Helmet>
      <ContentsBody>
        <ArticleHeader>
          <Title>{key}</Title>
          {user && (
            <LikeButton
              contentsKey={key}
              contentsType={contentsType}
              bookmarkState={isBookmark}
              bookmarkHandler={setIsBookmark}
            />
          )}
        </ArticleHeader>
        <Text>
          {contents &&
            (contents.result.paragraphs.length > 0 && contents.result.text ? (
              contents.result.text.match(/(\((.*?)\)| 삭제 <(.*?)>)/g)[0]
            ) : (
              <Paragraph>
                {" "}
                <Text> {ParseNewLine(contents.result.text)} </Text>{" "}
              </Paragraph>
            ))}
        </Text>
        {contents &&
          contents.result.paragraphs.length > 0 &&
          contents.result.paragraphs.map((val, idx) => (
            <Paragraph key={idx}>
              <SubTitle>{val.paragraph}</SubTitle>
              <Text>
                {ParseNewLine(val.text.replace(contents.result.text, ""))}
              </Text>
            </Paragraph>
          ))}
      </ContentsBody>

      {contents && <RelateContents docKey={key} target={contentsType} />}
    </Article>
  );
};

export default ContentsDetailBass;
