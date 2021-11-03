import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Helmet from "react-helmet";

import styled from "styled-components";
import colors from "../lib/colors";
import useBookmarkApi from "../hooks/api/useBookmarkApi";
import useUserRecoil from "../hooks/auth/useUserRecoil";

const BookMarkList = styled.ul`
  list-style: none;
`;

const BookmarkItem = styled.li``;

const Bookmark = () => {
  const { user } = useUserRecoil();
  const [bookmarks, setBookmarks] = useState(null);
  const { getBookmarkList } = useBookmarkApi();

  useEffect(() => {
    const loadBookmarks = async () => {
      const res = await getBookmarkList();

      console.log(res);
      setBookmarks(res);
    };

    if (user) {
      loadBookmarks();
    }
  }, [user]);

  return (
    <BookMarkList>
      {bookmarks &&
        bookmarks.data.map(({ content_key, content_type }) => (
          <BookmarkItem key={`${content_type}-${content_key}`}>
            {content_key}
          </BookmarkItem>
        ))}
    </BookMarkList>
  );
};

export default Bookmark;
