import React, { useCallback, useEffect, useRef, useState } from "react";
// import "../css/Board.css";
import styled from "styled-components";
import Helmet from "react-helmet";
import { useHistory } from "react-router-dom";

import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

import colors from "../lib/colors";

import SelectorButton from "../components/input/SelectorButton";
import FormBox from "../components/input/FormBox";
import InputText from "../components/input/InputText";
import Button from "../components/input/Button";
import useToast from "../hooks/useToast";
import { useRecoilState } from "recoil";
import { JWT_CODE, jwtState } from "../recoil/user";
import useForumApi from "../hooks/api/useForumApi";

const Title = styled.h1`
  font-size: 30px;
  margin: 0;
  color: ${colors.highlightColor};
`;

const DivisionLine = styled.hr`
  margin: 16px 0;
  width: 100%;
  border: 0;
  border-bottom: 1px solid ${colors.hrWhite};
`;

const SelectorWrapper = styled.div`
  width: 100%;
  label {
    color: ${colors.fontDarkGrey};
    font-weight: bold;
  }
`;

const forumList = [
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

const ForumWrite = () => {
  const editor = useRef();
  const history = useHistory();
  const [jwt] = useRecoilState(jwtState);
  const { ToastFail, ToastSuccess } = useToast();
  const [title, setTitle] = useState("");
  const [forumType, setForumType] = useState(forumList[0].key);

  const { addForum } = useForumApi();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const postForum = async (main) => {
        const res = await addForum(title, forumType, main);

        if (res) {
          ToastSuccess("게시글이 업로드 되었습니다!");
          history.replace(`/forum/@${res.id}`);
        } else {
          ToastFail("게시글 업로드 중 문제가 발생했습니다.");
        }
      };

      const editorInstance = editor.current.getInstance();
      const editorMd = editorInstance.getMarkdown();

      if (editorMd === "") {
        ToastFail("내용을 입력해 주세요");
      } else {
        postForum(editorMd);
      }
    },
    [editor, title, forumType]
  );

  const handleTitle = useCallback((e, target) => {
    setTitle(e.target.value);
  }, []);

  useEffect(() => {
    if (jwt.status === JWT_CODE.NONE) {
      history.replace("/");
    }
  }, [jwt]);

  return (
    <FormBox onSubmit={handleSubmit} fullWidth>
      <Title>게시글 작성</Title>
      <Helmet>
        <title>게시글 작성 - 로우팜</title>
      </Helmet>
      <InputText
        inputTitle="제목"
        type="text"
        handler={handleTitle}
        target="title"
        required
      />
      <SelectorWrapper>
        <label>분야</label>
        <SelectorButton
          categoryList={forumList}
          handler={setForumType}
          category={forumType}
        />
      </SelectorWrapper>

      <div className="customEditor">
        <Editor
          previewStyle="vertical"
          height="400px"
          initialEditType="wysiwyg"
          initialValue=""
          ref={editor}
        />
      </div>

      <DivisionLine />
      <Button>글 올리기</Button>
    </FormBox>
  );
};

export default ForumWrite;
