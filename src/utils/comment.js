import 
  {request}
 from './request'

 //文章评论
export const getArticlesCommentData = params => {
  return request({
    method: "GET",
    url: `/app/v1_0/comments`,
    params
  })
}