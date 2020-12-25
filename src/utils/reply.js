import 
  {request}
 from './request'

//添加评论与回复评论
export const addReply = data => {
  return request({
    method: "POST",
    url: `/app/v1_0/comments`,
    data
  })
}

 //评论点赞与回复评论点赞
export const addReplyFabulous = target => {
  return request({
    method: "POST",
    url: `/app/v1_0/comment/likings`,
    data:{
      target
    }
  })
}

//取消评论点赞与回复评论点赞
export const deleteReplyFabulous = target => {
  return request({
    method: "DELETE",
    url: `/app/v1_0/comment/likings/${target}`,
  })
}