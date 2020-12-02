import 
  {request}
 from './request'

 //文章详情
export const getArticlesDetailData = articleId => {
  return request({
    method: "GET",
    url: ` /app/v1_0/articles/${articleId}`,
  })
}