import React, { useState, useEffect, useRef, useCallback } from "react";

import styled from "styled-components";

import colors from "../lib/colors";

import useForumApi from "../hooks/api/useForumApi";
import { useRecoilState } from "recoil";
import { JWT_CODE, jwtState } from "../recoil/user";
import Button from "./input/Button";
import CommentItem from "./CommentItem";
import ModalForm from "./input/ModalForm";

import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import useToast from "../hooks/useToast";

const CommentStyle = styled.div`
  max-width: 1024px;
  box-sizing: border-box;
  padding: 0 20px;
  width: 100%;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  margin: 0 0 16px 0;
  font-size: 24px;
  font-weight: normal;
  color: ${colors.highlightColor};
`;

const DivisionLine = styled.hr`
  margin: 16px 0;
  width: 100%;
  border: 0;
  border-bottom: 1px solid ${colors.hrWhite};
`;

const CommentList = styled.div`
  width: 100%;

  .item {
  }
`;

const ForumComment = ({ forumId }) => {
  const [commentList, setCommentList] = useState(null);
  const [modalToggle, setModalToggle] = useState(false);
  const [reloaded, setReloaded] = useState(false);

  const editor = useRef();

  const { ToastFail, ToastSuccess } = useToast();
  const [jwt] = useRecoilState(jwtState);
  const { loadCommentList, addComment } = useForumApi();

  useEffect(() => {
    const loadComment = async () => {
      const res = await loadCommentList(forumId);
      setCommentList(res.data);
      setReloaded(true);
    };

    if (forumId && jwt.status === JWT_CODE.OK && !reloaded) {
      loadComment();
    }
  }, [forumId, jwt, reloaded]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const sendComment = async (forumId, main) => {
        const res = await addComment(forumId, main);

        if (res) {
          ToastSuccess("답변이 업로드 되었습니다!");
        } else {
          ToastFail("답변 업로드 중 문제가 발생했습니다.");
        }

        setModalToggle(false);
        setReloaded(false);
      };
      const editorInstance = editor.current.getInstance();
      const editorMd = editorInstance.getMarkdown();

      if (editorMd === "") {
        ToastFail("내용을 입력해 주세요");
      } else {
        sendComment(forumId, editorMd);
      }
    },
    [editor, forumId]
  );

  return (
    <CommentStyle>
      <Title>답변 목록</Title>

      {commentList && (
        <CommentList>
          {commentList.map((val) => (
            <CommentItem key={val.id} comment={val} />
          ))}
        </CommentList>
      )}
      <Button onClick={() => setModalToggle(true)}>답변 작성</Button>
      {modalToggle && (
        <ModalForm onSubmit={handleSubmit} handleModal={setModalToggle}>
          <Title>답변 작성</Title>
          <Editor
            previewStyle="vertical"
            height="400px"
            initialEditType="wysiwyg"
            initialValue=""
            ref={editor}
          />
          <DivisionLine />
          <Button>작성 완료</Button>
        </ModalForm>
      )}
    </CommentStyle>
  );
};

export default ForumComment;
