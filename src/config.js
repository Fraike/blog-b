import axios from 'axios'
import {
    message
} from 'antd'


axios.interceptors.request.use(function (config) {
    // window.loading =  message.loading('loading',0);
    return config
})

axios.interceptors.response.use(function (config) {
    // message.success(config.data.msg);
    // setTimeout(loading,0);
    return config
})