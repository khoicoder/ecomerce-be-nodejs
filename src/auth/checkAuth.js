'use strict'

const { findById } = require("../service/apikey.service")

const HEADER = {
    API_KEY:'x-api-key',
    AUTHORIZATION: 'authorization'

}

const apikey= async(req,res,next)=>{
    try{
        const key = req[HEADER.API_KEY]?.toString()
        if(!key){
            return res.status().json({
                message: 'Forbidden Error'
                })
            }
            //Check objKey
            const objKey  =await findById(key)
        if(!objKey){
            return res.status().json({
                message: 'Forbidden Error'
                })
            }
            req.objKey = objKey
            return next()

        } catch(err){
        return err

    }
}
module.exports = {
    apikey
}