'use strict';

const shopModels = require("../models/shop.models");
const bcrypt = require('bcrypt');
const { generateKeyPairSync } = require('crypto');
const keyTokenService = require("../service/keyToken.service")
const { createTokenPair } = require('../auth/authUtils');
const { format } = require("morgan");
const { getInforData } = require("../utils");

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'writer',
    EDITER: 'EDITER',
    ADMIN: 'ADMIN'
};

class AccessService {

    static signUp = async ({ name, email, password }) => {
        try {

            console.log('--- START signUp ---');
           

            // 1. Check shop tồn tại
            const holderShop = await shopModels.findOne({ email }).lean();
            if (holderShop) {
                return {
                    code: 'avc',
                    message: 'Shop already registered!'
                };
            }

            // 2. Hash password
            const passwordHash = await bcrypt.hash(password, 10);
            const newShop = await shopModels.create({
                name,
                email,
                password: passwordHash,
                roles: [RoleShop.SHOP]
            });
            // if(newShop){
            //     const privateKey =crypto.getRandomBytes(64).toString('hex')
            //     const publicKey = crypto.getRandomBytes(64).toString('hex')
            //     console.log({privateKey,publicKey})
                
            // }
//_id: newShop._id,
//email: newShop.email,
//name: newShop.name
            console.log('newShop created:', {
                _id: newShop._id,
                email: newShop.email,
                name: newShop.name
            });

            // 3. Tạo privateKey & publicKey
            const { privateKey, publicKey } = generateKeyPairSync('rsa', 
                {
                modulusLength: 4096,
                publicKeyEncoding :{
                    type:'spki',format: 'pem'
                    },
                privateKeyEncoding:{
                    type:'pkcs8', format: 'pem'
                }
            } );
    
            const publicKeyString = publicKey;         // đã là PEM
            const privateKeyString = privateKey; 
    
            console.log('Generated keys:', {
                privateKeyType: typeof privateKey,
                publicKeyType: typeof publicKey
            });

            // 4. Lưu publicKey vào DB
            const keyStore = await keyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey: publicKeyString,
                privateKey: privateKeyString
                

            });

            console.log('Key store result:', keyStore);
            if (!keyStore) {
                return {
                    code: "XXX",
                    message: "publicKeyString Error"
                };
            }

            // 5. Tạo accessToken & refreshToken
    
            const tokens = await createTokenPair(
                { userId: newShop._id, email },
                privateKeyString,
                publicKeyString 
                    );
            console.log("Tokens created:", tokens);

            // 6. Lưu refreshToken vào DB
            if (!tokens || !tokens.refreshToken) {
                return {
                code: 'xxx',
                message: 'Failed to create tokens',
                status: 'error'
    };
}
            const shopObject = newShop.toObject();
//shop: getInforData({fileds: ['_id','name','email'],object: newShop}),
// await keyTokenService.updateRefreshToken(newShop._id, tokens.refreshToken, []);
            const infor =  getInforData(['_id','name','email'], shopObject)
            console.log('--- END signUp ---');
            return {
                code: 201,
                metadata: {
                    shop: infor,
                    tokens
                }
            };

        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            };
        }
    };
}

module.exports = AccessService;
