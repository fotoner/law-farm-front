import styled from "styled-components";
import SearchInput from "../components/SearchInput";
import colors from "../lib/colors";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const Title = styled.div`
  margin-top: 200px;
  text-align: center;
  font-size: 88px;
  font-weight: bold;
  color:${colors.highlightColor};
`;

const SubTitle = styled.div`
  
`

const Input =  styled.div`
  width: 600px;
  margin-top: 54px;
`

const Home = () => {

  return (
    <Content>
      <Title>로우팜</Title>
      <SubTitle>우리를 위한 법률 검색</SubTitle>
      <Input>
        <SearchInput/>
      </Input>

    </Content>
  );
}
export default Home;