import {
  request
}
from './request'

//相关搜索
export const getSearchRelatedData = q => {
  return request({
    method: "GET",
    url: `/app/v1_0/suggestion`,
    params: {
      q
    }
  })
}


