'use strict'
const mongoose = require('mongoose')
const{db:{host,name, port}} = require("../config/config.mongodb")//cách cơ bản
const connectString = `mongodb://${host}:${port}/${name}`;
const {countConnect} = require('../helpers/check.connect')

class Database {
    constructor() {
        this.connect()
    }

    connect(type = 'mongodb') {

        // GIỮ NGUYÊN debug như bạn muốn
        if (1 === 1) {
            mongoose.set('debug', true)
            mongoose.set('debug', { color: true })
        }
        //maxPoolSize
        mongoose.connect(connectString, { maxPoolSize: 50 })
            .then(_ => console.log(`Connected MongoDB Success`, countConnect()
            ),console.log(connectString))
            .catch(err => {
                // In lỗi thật để debug
                console.log("MongoDB Error:", err)
            })
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}

module.exports = Database.getInstance()
