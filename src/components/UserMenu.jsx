import { useCallback, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import colors from "../lib/colors";

const MenuUl = styled.ul`
  z-index: 9999;
  background-color: #fff;
  position: absolute;
  padding: 2px 0;
  margin: 8px 0 0;
  right: 0;

  border: solid 1px ${colors.hrWhite};
  border-radius: 8px;
  width: 192px;
  box-sizing: border-box;
  box-shadow: 10px 10px 20px 1px rgb(0 0 0 / 20%);

  li {
    cursor: pointer;
    font-weight: normal;
    list-style: none;
    padding: 8px 16px;
    color: ${colors.fontDarkGrey};

    &:hover {
      background-color: ${colors.hrWhite};
    }

    a {
      display: flex;
      width: 100%;
    }
  }
`;

const UserMenu = ({ handler, toggle }) => {
  const menuRef = useRef();

  const handleClickOutside = useCallback(
    ({ target }) => {
      if (toggle && menuRef.current && !menuRef.current.contains(target))
        handler();
    },
    [toggle]
  );

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <MenuUl ref={menuRef}>
      <li>
        <Link to="/mypage">내정보</Link>
      </li>
      <li>
        <Link to="/bookmark">북마크</Link>
      </li>
      <li>
        <Link to="/logout">로그아웃</Link>
      </li>
    </MenuUl>
  );
};

export default UserMenu;
