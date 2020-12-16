import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

//配置相对时间
dayjs.extend(relativeTime)

dayjs.locale('zh-cn')

//处理相对时间
Vue.filter('relativeTime',value=>{
  return dayjs(value).from(dayjs())
})

//处理时间格式化
Vue.filter('datetime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})