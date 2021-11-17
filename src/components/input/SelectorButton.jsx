import React from "react";
import styled from "styled-components";
import colors from "../../lib/colors";

const CategoryContainer = styled.div`
  margin-bottom: 16px;

  .selected {
    color: ${colors.highlightColor};

    border: 2px solid ${colors.highlightColor};
  }
`;

const CategoryButton = styled.div`
  display:inline-block;

  cursor: pointer;
  margin-right: 8px;

  box-sizing: border-box;
  padding: 4px 16px;

  border-radius: 32px;
  border: 2px solid ${colors.borderColor};

  user-select: none;
  color: ${colors.fontGrey};
`;

const SelectorButton = ({ categoryList, handler, category }) => {
  return (
    <CategoryContainer>
      {categoryList.map(({ name, key }) => (
        <CategoryButton
          className={category === key ? "selected" : ""}
          key={key}
          onClick={() => handler(key)}
        >
          {name}
        </CategoryButton>
      ))}
    </CategoryContainer>
  );
};

export default SelectorButton;
