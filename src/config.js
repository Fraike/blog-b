import axios from 'axios'
import {
    message
} from 'antd'

// axios.interceptors.request.use(function (config) {

//     return config
// })

axios.interceptors.response.use(function (config) {
    console.log(config)
    message.success(config.data.msg);
    return config
})