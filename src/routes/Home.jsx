import Helmet from "react-helmet";
import styled from "styled-components";

import SearchInput from "../components/input/SearchInput";
import colors from "../lib/colors";
import useUserRecoil from "../hooks/auth/useUserRecoil";
import HomeRecommend from "../components/HomeRecommend";

const Content = styled.div`
  /* left: 0; */
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 100%; */
`;

const Title = styled.div`
  margin-top: 200px;
  text-align: center;
  font-size: 88px;
  font-weight: bold;
  color: ${colors.highlightColor};
`;

const SubTitle = styled.div``;

const Input = styled.div`
  width: 100%;
  margin-top: 54px;
`;

const Home = () => {
  const { user } = useUserRecoil();

  return (
    <Content>
      <Helmet>
        <title>로우팜</title>
      </Helmet>
      <Title>로우팜</Title>
      <SubTitle>우리를 위한 법률</SubTitle>
      <Input>
        <SearchInput />
      </Input>
      {user && <HomeRecommend />}
    </Content>
  );
};
export default Home;
