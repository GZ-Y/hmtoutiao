import 
  {request}
 from './request'

export const getCaptchaData = mobile => {
  return request({
    method: "GET",
    Headers: {'Content-Type': 'application/json'},
    url: `/app/v1_0/sms/codes/${mobile}`,
  })
}


export const getLoginData = data => {
  return request({
    method: "POST",
    Headers: {'Content-Type': 'application/json'},
    url: `/app/v1_0/authorizations`,
    params:data
  })
}
