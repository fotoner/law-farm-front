import React, { useEffect, useState, useCallback } from "react";
import { useHistory, useParams, useLocation, Link } from "react-router-dom";
import Helmet from "react-helmet";

import styled from "styled-components";
import queryString from "query-string";

import useStatuteApi from "../hooks/api/useStatuteApi";
import colors from "../lib/colors";
import PageButton from "../components/input/PageButton";

const PageStyle = styled.div`
  margin-top: 64px;
  position: absolute;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  .side {
    z-index: 999;
    left: 0;
    max-height: 100%;
    overflow: auto;
    position: fixed;
    display: flex;
  }
  .main {
    max-width: 700px;
    width: 100%;
  }
`;

const NavList = styled.div`
  display: ${({ none }) => (none ? "flex" : "none")};
  flex-direction: column;

  border-top: solid 1px ${colors.hrWhite};

  width: 500px;
  max-height: 100%;
  overflow: auto;

  background-color: #fff;

  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${colors.highlightColor};
  }
  ::-webkit-scrollbar-track {
    background-color: ${colors.hrWhite};
  }

  a {
    font-size: 15px;
    color: ${colors.fontDarkGrey};
    padding: 5px 20px;
    border-top: solid 1px ${colors.hrWhite};

    :hover {
      background-color: ${colors.hrWhite};
    }
  }
  a.selected {
    font-weight: bold;
    color: ${colors.highlightColor};
  }
`;

const NavButton = styled.div`
  background-color: #fff;
  border: solid 1px ${colors.hrWhite};
  height: 36px;
  padding: 2px 6px;
  display: flex;
  user-select: none;
  justify-content: center;
  align-items: center;
  color: ${colors.highlightColor};
  font-weight: bold;
  font-size: 20px;
  width: 100px;
  cursor: pointer;
  :hover {
    background-color: ${colors.hrWhite};
  }
  //transform: translateY(50vh);
`;

const Title = styled.h1`
  margin: 0 0 32px 0;
  font-size: 48px;
  color: ${colors.highlightColor};
  font-weight: normal;
`;

const ResultBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  margin-bottom: 64px;
`;

const ResultItem = styled.div`
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  padding: 20px;
  box-shadow: 0 2px 10px -5px black;
  border-radius: 20px;

  background-color: #fff;
  margin-bottom: 15px;
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

const LawList = () => {
  const { forumId } = useParams();
  const { search } = useLocation();
  const { page } = queryString.parse(search);
  const history = useHistory();

  const { getStatuteCategory, getStatute } = useStatuteApi();

  const [category, setCategory] = useState(null);
  const [statuteList, setStatuteList] = useState(null);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const loadCategory = async () => {
      const res = await getStatuteCategory();

      setCategory(res.result);
    };

    loadCategory();
  }, []);

  useEffect(() => {
    const loadStatute = async () => {
      const curPage = page ? page : 1;

      const res = await getStatute(forumId, (curPage - 1) * 10, 10);

      setStatuteList(res);
    };
    if (forumId) {
      loadStatute();
    }
  }, [forumId, page]);

  const handleMenu = useCallback(() => {
    setMenu(!menu);
  }, [menu]);

  const handlePage = useCallback(
    (nextPage) => {
      history.push(`/laws/@${forumId}?page=${nextPage}`);

      window.scrollTo(0, 0);
    },
    [history, forumId]
  );

  return (
    <PageStyle>
      <Helmet>
        <title>{forumId} - 법률 - 로우팜</title>
      </Helmet>
      <div className="side">
        <NavList none={menu}>
          {category &&
            category.map((val) => (
              <Link
                onClick={() => {
                  setMenu(false);
                }}
                to={`/laws/@${val}?page=1`}
                className={forumId === val ? "selected" : ""}
                key={val}
              >
                {val}
              </Link>
            ))}
        </NavList>
        <NavButton onClick={handleMenu}>
          법률 {menu ? "접기" : "펼치기"}
        </NavButton>
      </div>

      <div className="main">
        <Title>{forumId}</Title>
        <ResultBox>
          {statuteList &&
            statuteList.result.map((val) => (
              <ResultItem>
                <Link key={val.fullname} to={`/article/@${val.fullname}`}>
                  <div className="title">{val.fullname}</div>
                  <div className="content">
                    <div className="type">
                      {val.text.length > 0
                        ? val.text.match(/(\((.*?)\)| 삭제 <(.*?)>)/g)[0]
                        : val.text}
                    </div>
                    <div className="paragraphCount">
                      {val.count > 0 ? `*${val.count}개의 항 존재*` : ""}
                    </div>
                  </div>
                  <DetailLink>〈</DetailLink>
                </Link>
              </ResultItem>
            ))}
        </ResultBox>
        {statuteList && (
          <PageButton
            maxItemsCount={statuteList.count}
            page={Number(page)}
            handler={handlePage}
          />
        )}
      </div>
    </PageStyle>
  );
};

export default LawList;
