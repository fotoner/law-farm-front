import React from "react";
import styled from "styled-components";
import Pagination from "react-js-pagination";
import colors from "../../lib/colors";

const PageSelector = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul.pagination li {
    transition: color 0.1s, background-color 0.1s;
    cursor: pointer;
    border-radius: 36px;

    box-shadow: 0 2px 12px -5px black;
    display: inline-block;
    width: 36px;
    height: 36px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    
    :not(:last-child){
      margin-right: 8px;
    }
  }

  ul.pagination li a {
    text-decoration: none;
    color: ${colors.highlightColor};
    /* font-size: 16px; */
  }

  ul.pagination li.active a {
    color: white;
  }

  ul.pagination li.active {
    background-color: ${colors.highlightColor};
  }

  ul.pagination li:hover {
    background-color: ${colors.lightColor};

    a{
      color: white;
    }
  }

`;

const PageButton = ({ maxItemsCount, handler, page }) => {
  return (
    <PageSelector>
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={maxItemsCount}
        pageRangeDisplayed={10}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handler}
      />
    </PageSelector>
  );
};

export default PageButton;
