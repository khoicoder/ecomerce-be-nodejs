'use strict'

const { referrerPoliccy } = require('helmet')
const JWT = require('jsonwebtoken')

const TWO_HOURS = 60 * 60 * 2
const SEVEN_DAYS = 60 * 60 * 24 * 7

/**
 * createTokenPair(payload, privateKeyPem, publicKeyPem)
 * - privateKeyPem: PEM string (BEGIN PRIVATE KEY / BEGIN RSA PRIVATE KEY)
 * - publicKeyPem: PEM string (BEGIN PUBLIC KEY / BEGIN RSA PUBLIC KEY)
 */
const createTokenPair = (payload, privateKeyPem, publicKeyPem) => {
  try {
    // basic checks
    if (!payload || typeof payload !== 'object') {
      throw new Error('Invalid payload. Expect object.')
    }
    if (!privateKeyPem || typeof privateKeyPem !== 'string') {
      throw new Error('Invalid privateKey. Expect PEM string.')
    }
    if (!publicKeyPem || typeof publicKeyPem !== 'string') {
      throw new Error('Invalid publicKey. Expect PEM string.')
    }

    // console.log('createTokenPair: payload keys =', Object.keys(payload))
    // console.log('createTokenPair: privateKey length =', privateKeyPem.length)
    // console.log('createTokenPair: publicKey length = ', publicKeyPem.length)

    // sign tokens (synchronous)
    const accessToken = JWT.sign(payload, privateKeyPem, {
      algorithm: 'RS256',
      expiresIn: TWO_HOURS
    })

    const refreshToken = JWT.sign(payload, privateKeyPem, {
      algorithm: 'RS256',
      expiresIn: SEVEN_DAYS
    })

    // JWT.verify(accessToken, publicKeyPem,(err,decode)=>{
    //   if(err){
    //     console.log('verify err::',err)
    //   }else{
    //     console.log('decode verify::',decode)
    //   }
        
    // });

    // verify one token to ensure keys are compatible
    try {
      const decoded = JWT.verify(accessToken, publicKeyPem)
      console.log('createTokenPair: verify success, decoded keys::', Object.keys(decoded))
    } catch (verErr) {
      console.error('createTokenPair: verify failed::', verErr && verErr.message)
      // throw so caller knows tokens are not valid
      throw new Error('Token verify failed: ' + (verErr && verErr.message))
    }

    return { accessToken, refreshToken }
  } catch (error) {
    console.error('createTokenPair error:', error && error.message)
    // bubble up the error (caller can handle). Return null only if you prefer previous behaviour.
    throw error
  }
}

module.exports = { createTokenPair }
