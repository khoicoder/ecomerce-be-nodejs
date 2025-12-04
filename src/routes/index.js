    'use strict'
    const express = require('express')
    const { apikey } = require('../auth/checkAuth')
    const router = express.Router()
    //check apikey sao khi tạo 
    router.use(apikey)
    router.use('/shop',require('./access/shop/index'))
    // router.get('',(req,res,next) => {
    //     // const strCompress = " zzzzdsdzaz";
    //     return res.status(200).json({       
    //         message : 'welcome to server',
    //         // metadata : strCompress.repeat(1000000)
    //     });
    // });
    module.exports =router