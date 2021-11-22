import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import colors from "../../lib/colors";

import useScroll from "../../hooks/useScroll";
import useUserRecoil from "../../hooks/auth/useUserRecoil";

import UserMenu from "../input/UserMenu";

const Navbar = styled.nav`
  display: flex;
  position: fixed;
  z-index: 800;
  width: 100%;
  height: 64px;
  min-height: 64px;
  box-sizing: border-box;
  transition: background 0.3s, border-bottom 0.3s, box-shadow 0.3s;
  user-select: none;

  &.scrolled {
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);

    background-color: #fff;
  }

  & > .inner {
    width: 100%;
    box-sizing: border-box;
    padding-left: 32px;
    padding-right: 32px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .left {
      cursor: pointer;
      display: flex;
      line-height: 1;
      font-size: 24px;
      font-weight: bold;
      a {
        color: ${colors.highlightColor};
      }
    }
    .center {
      a {
        transition: color 0.15s;
        color: ${colors.fontGrey};
        font-weight: bold;

        :hover {
          color: ${colors.highlightColor};
        }

        :not(:last-child) {
          margin-right: 16px;
        }
      }
    }
    .right {
      .mypage {
        position: relative;
        color: ${colors.highlightColor};
        cursor: pointer;
        font-weight: bold;
      }
      .login,
      .logout {
        color: ${colors.fontGrey};
      }
    }
  }
`;

const DesktopHeader = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled] = useScroll();
  const { user } = useUserRecoil();

  const handleToggle = useCallback(() => {
    setToggle(!toggle);
  }, [toggle]);

  const handlerToggleFalse = useCallback(() => {
    setToggle(false);
  }, []);

  return (
    <Navbar className={"navbar " + (scrolled ? "scrolled" : "")}>
      <div className="inner">
        <div className="left">
          <Link to="/">로우팜</Link>
        </div>
        <div className="center">
          <Link to="/recommends">Recommends</Link>
          <Link to="/laws/@근로기준법?page=1">Laws</Link>
          <Link to="/forum">Forum</Link>
        </div>
        <div className="right">
          {!user ? (
            <Link to="/login" className="login">
              로그인
            </Link>
          ) : (
            <div>
              <div className="mypage" onClick={handleToggle}>
                {user.username}
                {toggle && (
                  <UserMenu toggle={toggle} handler={handlerToggleFalse} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Navbar>
  );
};

export default DesktopHeader;
