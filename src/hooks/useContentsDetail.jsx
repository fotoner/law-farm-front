import { useEffect, useState } from "react";
import useDocumentApi from "./api/useDocumentApi";

const useContentsDetail = ({ contentsType, contentsKey }) => {
  const [contents, setContents] = useState(null);
  const { loadDetail } = useDocumentApi();

  useEffect(() => {
    const requestDetail = async () => {
      const res = await loadDetail(contentsKey, contentsType);
      setContents(res);
    };
    if (contentsKey) {
      requestDetail(contentsKey);
    }
  }, [contentsKey, contentsType]);

  return [contents];
};

export default useContentsDetail;
