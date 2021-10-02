import { useParams } from "react-router-dom";
import styled from "styled-components";

import colors from "../lib/colors";

import useContentsDetail from "../hooks/useContentsDetail";

import RelateContents from "./RelateContents";

const Title = styled.div`
  font-size: 48px;
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
  word-break: keep-all;
`;

const Paragraph = styled.div`
  margin: 40px 0;
`;

const ContentsDetailBaes = ({ contentsType }) => {
  const { key } = useParams();

  const [contents] = useContentsDetail({
    contentsType: contentsType,
    contentsKey: key,
  });

  return (
    <>
      <ContentsBody>
        <Title>{key}</Title>
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

      <RelateContents docKey={key} target={contentsType} />
    </>
  );
};

export default ContentsDetailBaes;
