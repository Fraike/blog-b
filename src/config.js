import axios from 'axios'
import {
    message
} from 'antd'

axios.interceptors.request.use(function (config) {
    message.loading('Action in progress..', 1000)
    return config
})

axios.interceptors.response.use(function (config) {
    message.success('This is a message of success');

    return config
})