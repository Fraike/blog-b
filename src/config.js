import axios from 'axios'
import {
    message
} from 'antd'

// axios.interceptors.request.use(function (config) {

//     return config
// })

axios.interceptors.response.use(function (config) {
    message.success('发送成功');
    return config
})