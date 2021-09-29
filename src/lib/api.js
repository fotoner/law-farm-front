import baseAxios from "./baseAxios"

const searchResult = (query, target = 'article', size = 25) => {
  // target is article or paragraph 
  // detail in http://api.fotone.moe:8000/docs#/recommends/search_query_v1_recommends_search_get

  return baseAxios.get('/recommends/search', {
    params: {
      query: query,
      target: target,
      size: size
  }})
}

const loadDetail = (key, target = 'article') => {
  // target is article or paragraph 
  // detail in http://api.fotone.moe:8000/docs#/laws/get_article_v1_laws_article___key__get

  return baseAxios.get(`/laws/${target}/@${key}`)
}

const documentRelateObject = (key, target='article', size=25) => {
  return baseAxios.get(`/recommends/${target}/`, {          
    params: {
    key: key,
    size: size
  }})
}

export {
  searchResult,
  loadDetail,
  documentRelateObject
}