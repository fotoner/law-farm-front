import { useState, useEffect } from "react";

import DesktopHeader from "./DesktopHeader";

const getWindowWidth = () => {
  const { innerWidth: width } = window;
  return width;
};

const Header = () => {
  const [width, setWidth] = useState(getWindowWidth());

  useEffect(() => {
    const handleResize = () => {
      const curWidth = getWindowWidth();
      setWidth(curWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
    
  // }, [location, themeList, hideList]);

  return width > 1024 ? (
    <DesktopHeader />
  ) : (
    <DesktopHeader />
  );
};

export default Header;
