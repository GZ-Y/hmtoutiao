import {
  request
}
from './request'

//相关搜索(联想建议)
export const getSearchRelatedData = q => {
  return request({
    method: "GET",
    url: `/app/v1_0/suggestion`,
    params: {
      q
    }
  })
}

//搜索结果
export const getSearchResultData = q => {
  return request({
    method: "GET",
    url: `/app/v1_0/search`,
    params: {
      q
    }
  })
}


