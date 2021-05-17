import {useEffect, useState} from "react";
import styled from "styled-components";

import {useParams} from "react-router-dom"
import axios from "axios";
import colors from "../lib/colors";

import RelateArticle from "../components/RelateArticle";

const Title = styled.div`

  font-size: 48px;
  color: ${colors.highlightColor};
`

const SubTitle = styled.div`
  width: 100%;
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: solid 1px ${colors.borderColor};
  font-size: 24px;
`

const Article = styled.div`
  margin-top: 100px;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  box-shadow: 0 2px 10px -5px black;
  border-radius: 20px;
`

const Text = styled.div`
  word-break: keep-all;
`

const Paragraph = styled.div`
  margin: 40px 0;
`

const ArticleDetail = () => {
  const [document, setDocument] = useState(null)
  const {key} = useParams()

  useEffect(() => {
    if (key) {
      axios
        .get('http://9e646106ff76.ngrok.io/law/article', {
          params: {
            key: key,
          }
        })
        .then((res) => {
          console.log(res.data)
          setDocument(res.data)
        })
    }
  }, [key])

  return (
    <>
      <Article>
        <Title>{key}</Title>
        <Text>
          {
            document &&
            (document.result.text.length > 0?
                document.result.text.match(/(\((.*?)\)| 삭제 <(.*?)>)/g)[0]:
                document.result.text
            )
          }
        </Text>
        {
          document && document.result.paragraphs.length > 0 &&
          document.result.paragraphs.map((val, idx) =>
            <Paragraph key={idx}>
              <SubTitle>
                {val.paragraph}
              </SubTitle>
              <Text>
                {val.text.replace(document.result.text, "")}
              </Text>
            </Paragraph>
          )}
      </Article>

      <RelateArticle docKey={key} target="article"/>
    </>
  );
}
export default ArticleDetail;