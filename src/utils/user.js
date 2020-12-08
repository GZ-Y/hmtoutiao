import {
  request
}
from './request'

//关注用户
export const followUserData = target => {
  return request({
    method: "POST",
    url: `/app/v1_0/user/followings`,
    data:{
      target
    }
  })
}

export const cancelFollowUserData = target => {
  return request({
    method: "DELETE",
    url: `/app/v1_0/user/followings/${target}`,
  })
}