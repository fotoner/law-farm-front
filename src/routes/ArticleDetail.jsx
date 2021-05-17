import {useEffect, useState} from "react";
import styled from "styled-components";

import SearchInput from "../components/SearchInput";
import {useParams} from "react-router-dom"
import axios from "axios";
import colors from "../lib/colors";

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
  margin: 100px 0;
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
  const { key } = useParams()

  useEffect(() => {
    if (key) {
      axios
        .get('http://d9432eb2b1f7.ngrok.io/law/article', {
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
    <Article>
      <Title>{key}</Title>
      <Text>
        {
          document&&
          document.result.text.match(/(\((.*?)\)(.*)?| 삭제 <(.*?)>(.*?))/g)[0]
        }
      </Text>
      {
        document&&document.result.paragraphs.length > 0 &&
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
  );
}
export default ArticleDetail;