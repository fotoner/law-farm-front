import styled from "styled-components";

import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import colors from "../lib/colors";

const CommentStyle = styled.div`
  width: 100%;

  margin-bottom: 32px;
  box-sizing: border-box;
  padding: 20px;
  box-shadow: 0 2px 10px -5px black;
  border-radius: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Username = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: normal;
  color: ${colors.highlightColor};
`;

const Date = styled.div`
  margin-left: 8px;
  color: ${colors.fontGrey};
`;

const CommentItem = ({ comment }) => {
  return (
    <CommentStyle>
      <Header>
        <Username>{comment.user.username}</Username>
        <Date>{comment.created_at.slice(0, 10)}</Date>
      </Header>

      <Viewer initialValue={comment.main} />
    </CommentStyle>
  );
};

export default CommentItem;
