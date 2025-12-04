'use strict';

const keyTokenModel = require("../models/keytoken.model");

class KeyTokenService {

    /**
     * Tạo hoặc cập nhật keyStore cho user
     * - Lưu publicKey (RSA PEM)
     * - Lưu refreshToken mới nhất
     * - Reset refreshTokensUsed
     */
    static async createKeyToken({ userId, publicKey, refreshToken }) {
        try {
            // Convert publicKey to PEM string nếu là object
            const publicKeyString = typeof publicKey === 'string'
                ? publicKey
                : publicKey.export({
                    type: 'spki',
                    format: 'pem'
                });
                

            const filter = { user: userId };
            const update = {
                publicKey: publicKeyString,
                refreshToken,
                refreshTokensUsed: []
            };

            const options = {
                upsert: true,
                new: true
            };


            const result = await keyTokenModel.findOneAndUpdate(filter, update, options);
            return result;

        } catch (error) {
            console.error("createKeyToken Error:", error);
            return null;
        }
    }


    /**
     * Cập nhật refresh token khi user refresh token
     */
    static async updateRefreshToken(userId, newRefreshToken, refreshTokensUsed) {
        try {
            return await keyTokenModel.findOneAndUpdate(
                { user: userId },
                {
                    refreshToken: newRefreshToken,
                    refreshTokensUsed
                },
                { new: true }
            );
        } catch (error) {
            console.error("updateRefreshToken Error:", error);
            return null;
        }
    }


    /**
     * Tìm keyStore theo userId
     */
    static async findByUserId(userId) {
        try {
            return await keyTokenModel.findOne({ user: userId });
        } catch (error) {
            console.error("findByUserId Error:", error);
            return null;
        }
    }

}

module.exports = KeyTokenService;
