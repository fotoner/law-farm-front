import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import Helmet from "react-helmet";

import styled from "styled-components";
import queryString from "query-string";

import colors from "../lib/colors";

import SelectorButton from "../components/input/SelectorButton";
import PageButton from "../components/input/PageButton";

import useForumApi from "../hooks/api/useForumApi";
import useUserRecoil from "../hooks/auth/useUserRecoil";
import Button from "../components/input/Button";

const PageStyle = styled.div`
  margin-top: 72px;
  width: 100%;
  max-width: 700px;
`;

const Title = styled.div`
  font-size: 48px;
  color: ${colors.highlightColor};
  margin-bottom: 8px;
`;

const SubTitle = styled.div`
  font-size: 18px;
  color: ${colors.highlightColor};
`;

const ResultBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const ResultItem = styled.div`
  display: flex;
  user-select: none;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
  box-shadow: 0 2px 10px -5px black;
  border-radius: 20px;

  margin-bottom: 15px;
  width: 100%;
  //height: 300px;

  .left {
    flex: 1;

    .title {
      cursor: pointer;
      color: ${colors.highlightColor};
      font-size: 24px;
      :hover {
        text-decoration: underline;
      }
    }
    .content {
      display: -webkit-box;
      cursor: pointer;
      color: ${colors.fontGrey};
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      max-height: 48px;
      word-wrap: break-word;
      :hover {
        text-decoration: underline;
      }
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 4px;
      .left {
        display: flex;
        .category {
          display: inline-block;
          border-radius: 32px;
          box-sizing: border-box;
          padding: 1px 10px;
          font-size: 14px;
          color: #fff;
          background-color: ${colors.fontGrey};
        }
        .date {
          margin-left: 8px;
          font-size: 14px;
          color: ${colors.fontDarkGrey};
        }
      }
      .right {
        font-size: 14px;
        color: ${colors.highlightColor};
      }
    }
  }

  .right {
    display: flex;
    cursor: default;

    .count {
      font-size: 14px;
      margin-left: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .type {
        color: ${colors.fontGrey};
      }
      .value {
        color: ${colors.highlightColor};
      }
    }
  }
`;

const forumList = [
  {
    name: "전체",
    key: "전체",
  },
  {
    name: "교통사고",
    key: "교통사고",
  },
  {
    name: "층간소음",
    key: "층간소음",
  },
  {
    name: "창업",
    key: "창업",
  },
  {
    name: "퇴직금",
    key: "퇴직금",
  },
  {
    name: "가족",
    key: "가족",
  },
  {
    name: "학교폭력",
    key: "학교폭력",
  },
  {
    name: "기타",
    key: "기타",
  },
];

const sortList = [
  {
    name: "최신",
    key: "date",
  },
  {
    name: "좋아요",
    key: "like",
  },
  {
    name: "조회수",
    key: "view",
  },
  {
    name: "답변이 없는 글",
    key: "comment",
  },
];

const ForumList = () => {
  const [forumType, setForumType] = useState(forumList[0].key);
  const [sortType, setSortType] = useState(sortList[0].key);

  const [forums, setForums] = useState(null);
  const [reloaded, setReloaded] = useState(false);

  const history = useHistory();
  const { search } = useLocation();

  const { page } = queryString.parse(search);
  const { loadForumList } = useForumApi();
  const { user } = useUserRecoil();

  const handlePage = useCallback(
    (nextPage) => {
      history.push(`/forum?page=${nextPage}`);
      setReloaded(false);
    },
    [history]
  );

  useEffect(() => {
    setReloaded(false);
  }, [forumType, sortType]);

  useEffect(() => {
    const loadLogs = async () => {
      const curPage = page ? page : 1;

      const res = await loadForumList(
        (curPage - 1) * 10,
        10,
        forumType,
        sortType
      );
      setForums(res);
      setReloaded(true);
    };

    if (!reloaded) {
      loadLogs();
    }
  }, [reloaded, page]);

  return (
    <PageStyle>
      <Title>포럼</Title>
      <Helmet title={`포럼 - 로우팜`} />
      <SubTitle>정렬</SubTitle>
      <SelectorButton
        categoryList={sortList}
        handler={setSortType}
        category={sortType}
      />
      <SubTitle>분야</SubTitle>
      <SelectorButton
        categoryList={forumList}
        handler={setForumType}
        category={forumType}
      />
      <ResultBox>
        {forums &&
          forums.data.map((val, idx) => (
            <ResultItem key={val.id}>
              <div className="left">
                <Link to={`/forum/@${val.id}`}>
                  <div className="title">{val.title}</div>
                  <div className="content">{val.parse_short_main}</div>
                </Link>
                <div className="bottom">
                  <div className="left">
                    <div className="category">{val.forum_type}</div>
                    <div className="date">{val.created_at.slice(0, 10)}</div>
                  </div>
                  <div className="right">
                    <div className="user">{val.user.username}</div>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="count">
                  <div className="type">답변</div>
                  <div className="value">{val.comment_count}</div>
                </div>
                <div className="count">
                  <div className="type">추천</div>
                  <div className="value">{val.like_count}</div>
                </div>
                <div className="count">
                  <div className="type">조회</div>
                  <div className="value">{val.view_count}</div>
                </div>
              </div>
            </ResultItem>
          ))}
      </ResultBox>
      {user && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            history.push("/forum/write");
          }}
        >
          <Button>글 쓰기</Button>
        </form>
      )}
      {forums && (
        <PageButton
          maxItemsCount={forums.count}
          page={Number(page)}
          handler={handlePage}
        />
      )}
    </PageStyle>
  );
};

export default ForumList;
