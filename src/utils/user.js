import {
  request
}
from './request'

//获取用户信息
export const getUserInfoData = () => {
  return request({
    method: "GET",
    url: `/app/v1_0/user`,
  })
}

//获取用户个人信息
export const getPerInfoData = () => {
  return request({
    method: "GET",
    url: `/app/v1_0/user/profile`,
  })
}

//编辑用户个人信息
export const editPerInfoData = data => {
  return request({
    method: "PATCH",
    url: `/app/v1_0/user/profile`,
    data
  })
}

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

//取消关注用户
export const cancelFollowUserData = target => {
  return request({
    method: "DELETE",
    url: `/app/v1_0/user/followings/${target}`,
  })
}

