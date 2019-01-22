const mongoose = require('mongoose')

// const DB_URL = 'mongodb://root:mima@47.107.126.193:27017/blog?authSource=test' //线上地址
const DB_URL = 'mongodb://127.0.0.1:27017/blog' 

mongoose.connect(DB_URL, {
    useNewUrlParser: true
})
mongoose.connection.on('connnected', function () {
    console.log('数据库链接成功');

})

const models = {
    article: {
        title: {
            type: String,
            require: true
        },
        sub: {
            type: String,
            require: true
        },
        date: {
            type: Date
        },
        content: {
            type: String,
            require: true
        },
        favor: {
            type: Number,
            default: 0,
            require: true
        },
        comments: [{
            body: String,
            date: Date
        }]
    },
    album: {
        title: {
            type: String,
            require: true
        },
        sub: {
            type: String,
            require: true
        },
        list: {
            type: Array,
            require: true
        }
    },
    user: {
        account: {
            type: String,
            require: true
        }
    },
    share: {
        title: {
            type: String,
            require: true
        },
        desc: {
            type: String,
            require: true
        },
        type: {
            type: String,
            require: true
        },
        urlPath: {
            type: String,
            require: true
        }
    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name)
    }
}