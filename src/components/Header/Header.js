import React from 'react'
import "./Header.css"    
    


const Header = () => {
    return (
        <div>
        <header>
            <nav className="Nav">
                <span className="Nav_title">Law Farm</span>
                <div className="Navi">
                    <a className="Navs" href="#login">
                        로그인
                    </a>
                    <a className="Navs" href="#mypage">
                         마이페이지
                    </a>
                    <a className="Navs" href="#signup">
                        회원가입
                    </a>
                   
                </div>
            </nav>
        </header>
        </div>
    );
    
  
}

export default Header



/*
        <div>
            <header>
                <nav className="Nav">
                    <span className="Nav_title">Law Farm</span>
                    <div className="Navi">
                        <a className="Navs" href="#login">
                            로그인
                        </a>
                        <a className="Navs" href="#mypage">
                             마이페이지
                        </a>
                        <a className="Navs" href="#add">
                            추가
                        </a>
                       
                    </div>
                </nav>
            </header>
        </div>
        */