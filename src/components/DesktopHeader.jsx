import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../lib/colors";
import useScroll from "../hooks/useScroll";

const Navbar = styled.nav`
  display: flex;
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 64px;
  min-height: 64px;
  box-sizing: border-box;
  transition: background .3s,border-bottom .3s;

  &.scrolled {
    border-bottom: solid 1px ${colors.background};
    background-color:#fff;
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
      /* margin-top:18px; */
      cursor: pointer;
      display: flex;
      line-height: 1;
      /* align-items: center;
      justify-content: center; */
      font-size: 24px;
      font-weight: bold;
      a {
        color: ${colors.highlightColor};
      }
    }
    .center {
    }
    .right {
      .login{
        color: ${colors.fontGrey}
      }
      .BoardPage{
        margin-right : 20px;
        color: ${colors.fontGrey}
      }
      
    }
  }
`;

const DesktopHeader = () => {
  const [scrolled] = useScroll();

  return (
    <Navbar className={"navbar " + (scrolled? "scrolled": "")}>
      <div className="inner">
        <div className="left">
          <Link to="/">로우팜</Link>
        </div>
        <div className="center"></div>
        <div className="right">
          <Link to="/BoardPage" className ="BoardPage">
            Q&A
          </Link>
          <Link to="/login" className="login">
            로그인
          </Link>
        </div>
      </div>
    </Navbar>
  );
};

export default DesktopHeader;
