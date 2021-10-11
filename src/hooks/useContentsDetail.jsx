import { useEffect, useState } from "react";
import { loadDetail } from "../lib/api";

const useContentsDetail = ({contentsType, contentsKey}) => {
  const [contents, setContents] = useState(null)

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
