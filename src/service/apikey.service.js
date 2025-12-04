'use strict'

const apiKeyModels = require("../models/apiKey.models")
const crypto = require('crypto')

const findById= async(key)=> {
    const newKey = await apiKeyModels.create({key:crypto.randomBytes(64).toString('hex'),permissions:['0000']})
    console.log(newKey)
    const objKey =await apiKeyModels.findOne({key,status:True}).lean();
    return objKey

}
module.exports = {findById

}