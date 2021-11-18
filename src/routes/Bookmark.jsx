import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import Helmet from "react-helmet";

import styled from "styled-components";
import colors from "../lib/colors";
import useBookmarkApi from "../hooks/api/useBookmarkApi";
import useUserRecoil from "../hooks/auth/useUserRecoil";

import LikeButton from "../components/input/LikeButton";
import PageButton from "../components/input/PageButton";

const BookMarkContent = styled.div`
  margin-top: 72px;
  max-width: 700px;
  width: 100%;
`;

const BookmarkTitle = styled.h1`
  font-size: 48px;
  margin: 0;
  color: ${colors.highlightColor};

  display: flex;
  align-items: center;
`;

const BookmarkCount = styled.div`
  font-size: 24px;
  margin-left: 8px;
  color: ${colors.fontGrey};
`;

const BookmarkList = styled.ul`
  margin: 48px 0 0 0;
  padding: 0;
  width: 100%;
  list-style: none;

  li {
    width: 100%;
    cursor: pointer;
    //position: relative;
    height: 100%;
    border-radius: 20px;
    box-shadow: 0 2px 10px -5px black;
    margin-bottom: 15px;
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    align-items: center;

    .left {
      flex: 1;
      .title {
        color: ${colors.highlightColor};

        font-size: 24px;
      }

      .content {
        display: flex;
        flex-direction: column;

        .date {
          color: ${colors.fontGrey};
        }
      }
    }
    .right {
    }
  }
`;

const Bookmark = () => {
  const { user } = useUserRecoil();
  const [bookmarks, setBookmarks] = useState(null);
  const [reloaded, setReloaded] = useState(false);

  const history = useHistory();
  const { search } = useLocation();

  const { page } = queryString.parse(search);
  const { getBookmarkList } = useBookmarkApi();

  const handlePage = useCallback(
    (nextPage) => {
      history.push(`/bookmark?page=${nextPage}`);
      setReloaded(false);
      window.scrollTo(0, 0);
    },
    [history]
  );

  useEffect(() => {
    const loadBookmarks = async () => {
      const curPage = page ? page : 1;

      const res = await getBookmarkList((curPage - 1) * 10, 10);

      setBookmarks(res);
      setReloaded(true);
    };

    if (!reloaded && user) {
      loadBookmarks();
    }
  }, [user, reloaded]);

  return (
    <BookMarkContent>
      <Helmet>
        <title>북마크 - 로우팜</title>
      </Helmet>
      <BookmarkTitle>
        북마크
        {bookmarks && (
          <BookmarkCount>{`(총 ${bookmarks.count}개)`}</BookmarkCount>
        )}
      </BookmarkTitle>
      <BookmarkList>
        {bookmarks &&
          bookmarks.data.map(
            ({ content_key, content_type, text, created_at }) => (
              <li key={`${content_type}-${created_at}`}>
                <div className="left">
                  <Link to={`/${content_type}/@${content_key}`}>
                    <div className="title">{content_key}</div>
                    <div className="content">
                      <div>{text.match(/(\((.*?)\)| 삭제 <(.*?)>)/g)[0]}</div>
                      <div className="date">
                        등록일자: {created_at.slice(0, 10)}
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="right">
                  <LikeButton
                    contentsType={content_type}
                    contentsKey={content_key}
                    bookmarkHandler={setReloaded}
                    bookmarkState={true}
                  />
                </div>
              </li>
            )
          )}
      </BookmarkList>
      {bookmarks && (
        <PageButton
          maxItemsCount={bookmarks.count}
          page={Number(page)}
          handler={handlePage}
        />
      )}
    </BookMarkContent>
  );
};

export default Bookmark;
