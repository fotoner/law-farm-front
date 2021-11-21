import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import colors from "../lib/colors";

const ContainerStyle = styled.div`
  width: 100%;
  .item {
    display: inline-block;
    margin-bottom: 8px;
    font-size: 14px;
    cursor: pointer;
    margin-right: 8px;
    box-sizing: border-box;
    padding: 2px 12px;
    user-select: none;
    border-radius: 32px;

    color: ${colors.highlightColor};

    border: 2px solid ${colors.highlightColor};

    transition: color 0.1s, border 0.1s;

    :hover {
      color: ${colors.lightColor};

      border: 2px solid ${colors.lightColor};
    }
  }
`;

const StatuteContainer = ({ statuteList }) => {
  return (
    <ContainerStyle>
      {statuteList &&
        statuteList
          .filter((val) => val.weight > 0.0)
          .map((val) => (
            <Link
              to={`/laws/@${val.name}?page=1`}
              className="item"
              key={val.name}
            >
              {val.name}
            </Link>
          ))}
    </ContainerStyle>
  );
};

export default StatuteContainer;
