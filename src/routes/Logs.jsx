import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import Helmet from "react-helmet";

import styled from "styled-components";

import colors from "../lib/colors";
import useLogApi from "../hooks/api/useLogApi";
import useUserRecoil from "../hooks/auth/useUserRecoil";

import PageButton from "../components/input/PageButton";

const LogContent = styled.div`
  margin-top: 72px;
  max-width: 700px;
  width: 100%;
`;

const LogTitle = styled.h1`
  font-size: 48px;
  margin: 0;
  color: ${colors.highlightColor};

  display: flex;
  align-items: center;
`;

const LogCount = styled.div`
  font-size: 24px;
  margin-left: 8px;
  color: ${colors.fontGrey};
`;

const LogList = styled.ul`
  margin: 48px 0 0 0;
  padding: 0;
  width: 100%;
  list-style: none;

  li {
    width: 100%;
    cursor: pointer;
    //position: relative;
    height: 100%;
    border-radius: 20px;
    box-shadow: 0 2px 10px -5px black;
    margin-bottom: 15px;
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    align-items: center;

    .left {
      flex: 1;
      .title {
        color: ${colors.highlightColor};

        font-size: 24px;
      }

      .content {
        display: flex;
        flex-direction: column;

        .date {
          color: ${colors.fontGrey};
        }
      }
    }
    .right {
    }
  }
`;

const Logs = () => {
  const { user } = useUserRecoil();
  const [logs, setLogs] = useState(null);
  const [reloaded, setReloaded] = useState(false);

  const history = useHistory();
  const { search } = useLocation();

  const { page } = queryString.parse(search);
  const { getLogList } = useLogApi();

  const handlePage = useCallback(
    (nextPage) => {
      history.push(`/logs?page=${nextPage}`);
      setReloaded(false);
      window.scrollTo(0, 0);
    },
    [history]
  );

  useEffect(() => {
    const loadLogs = async () => {
      const curPage = page ? page : 1;

      const res = await getLogList((curPage - 1) * 10, 10);
      setLogs(res);
      setReloaded(true);
    };

    if (!reloaded && user) {
      loadLogs();
    }
  }, [user, reloaded, page]);

  return (
    <LogContent>
      <Helmet>
        <title>열람 기록 - 로우팜</title>
      </Helmet>
      <LogTitle>
        열람 기록
        {logs && <LogCount>{`(총 ${logs.count}개)`}</LogCount>}
      </LogTitle>
      <LogList>
        {logs &&
          logs.data.map(({ content_key, content_type, text, created_at }) => (
            <li key={`${content_type}-${created_at}`}>
              <div className="left">
                <Link to={`/${content_type}/@${content_key}`}>
                  <div className="title">{content_key}</div>
                  <div className="content">
                    <div>
                      {text && text.match(/(\((.*?)\)| 삭제 <(.*?)>)/g)[0]}
                    </div>
                    <div className="date">
                      열람일자: {created_at.slice(0, 10)}
                    </div>
                  </div>
                </Link>
              </div>
            </li>
          ))}
      </LogList>
      {logs && (
        <PageButton
          maxItemsCount={logs.count}
          page={Number(page)}
          handler={handlePage}
        />
      )}
    </LogContent>
  );
};

export default Logs;
