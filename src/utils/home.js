
import 
  {request}
 from './request'

export const getAllChannelsData = () => {
  return request({
    method: "GET",
    url: `/app/v1_0/channels`,
  })
}

export const getChannelsArticlesData = params => {
  return request({
    method: "GET",
    url: `/app/v1_1/articles`,
    params
  })
}