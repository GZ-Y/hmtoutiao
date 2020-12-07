
import 
  {request}
 from './request'

 //全部频道
export const getAllChannelsData = () => {
  return request({
    method: "GET",
    url: `/app/v1_0/channels`,
  })
}

//当前用户频道（未登录和已登录是一个接口）
export const getUserChannelsData = () => {
  return request({
    method: "GET",
    url: `/app/v1_0/user/channels`,
  });
}

//设置用户频道，接口与上面一样，但是请求方式不同，而且有参数。
export const setUserChannelsData = channel => {
  return request({
    method: "POST",
    url: `/app/v1_0/user/channels`,
    data:{
      channels:[channel]
    }
  })
}

//修改用户频道（覆盖式）
export const modifyUserChannelsData = channel => {
  return request({
    method: "PATCH",
    url: `/app/v1_0/user/channels`,
    data:{
      channels:[channel]
    }
  })
}



//频道新闻推荐，就是上拉加载更多
export const getChannelsArticlesData = params => {
  return request({
    method: "GET",
    url: `/app/v1_1/articles`,
    params
  })
}