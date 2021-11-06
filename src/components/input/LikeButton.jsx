import { useCallback } from "react";

import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import colors from "../../lib/colors";

import useBookmarkApi from "../../hooks/api/useBookmarkApi";

const AddLike = styled.div`
  padding: 8px;
  border-radius: 36px;
  cursor: pointer;
  width: 36px;
  height: 36px;
  font-weight: bold;
  color: ${colors.highlightColor};
  transition: color 0.3s, background-color 0.3s;
  &:hover {
    background-color: ${colors.like}0f;
    color: ${colors.like};
  }
`;

const DeleteLike = styled.div`
  padding: 8px;
  border-radius: 36px;
  cursor: pointer;
  width: 36px;
  height: 36px;
  font-weight: bold;
  color: ${colors.like};
  transition: color 0.3s, background-color 0.3s;
  &:hover {
    background-color: ${colors.like}0f;
  }
`;

const LikeButton = ({
  contentsKey,
  contentsType,
  bookmarkState,
  bookmarkHandler,
}) => {
  const { addBookmark, deleteBookmark } = useBookmarkApi();

  const handleLike = useCallback(async () => {
    if (bookmarkState) {
      const res = await deleteBookmark(contentsKey, contentsType);

      if (res) {
        bookmarkHandler(false);
      }
    } else {
      const res = await addBookmark(contentsKey, contentsType);

      if (res) {
        bookmarkHandler(true);
      }
    }
  }, [bookmarkState, contentsKey, contentsType]);

  return bookmarkState ? (
    <DeleteLike onClick={handleLike}>
      <AiFillHeart size={36} />
    </DeleteLike>
  ) : (
    <AddLike onClick={handleLike}>
      <AiOutlineHeart size={36} />
    </AddLike>
  );
};

export default LikeButton;
