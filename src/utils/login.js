import 
  {request}
 from './request'

export const getCaptchaData = mobile => {
  return request({
    method: "GET",
    url: `/app/v1_0/sms/codes/${mobile}`,
  })
}

export const getLoginData = data => {
  return request({
    method: "POST",
    url: `/app/v1_0/authorizations`,
    data
  })
}
