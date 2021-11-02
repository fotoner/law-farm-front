import { useEffect, useState } from "react";
import useDocumentApi from "./useDocumentApi";

const useContentsDetail = ({contentsType, contentsKey}) => {
  const [contents, setContents] = useState(null)
  const {loadDetail} = useDocumentApi();

  useEffect(() => {
      if (contentsKey) {
        loadDetail(contentsKey, contentsType)
          .then((res) => {
            console.log(res.data)
            setContents(res.data)
          })
      }
    }, [contentsKey, contentsType])
  
    return [contents]
}

export default useContentsDetail
