const crypto = require('crypto');
const dotenv=require('dotenv').config();


const KEY_1=process.env.KEY_1;
const KEY_2=process.env.KEY_2;

const key = Buffer.from(KEY_1,KEY_2);


const encryptAlgo=(plaintext)=> {
    const plaintextJson = JSON.stringify(plaintext)

    const iv = crypto.randomBytes(12)
    const cipher = crypto.createCipheriv('aes-256-gcm',key, iv)
    const enc = Buffer.concat([cipher.update(plaintextJson, 'utf8'), cipher.final()])


    return [enc, iv, cipher.getAuthTag()].map(e => e.toString('base64')).join('~')
}

const decryptAlgo=(ciphertext)=> {
    const [enc, iv, authTag] = ciphertext.split('~').map(e => Buffer.from(e, 'base64'))
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
    decipher.setAuthTag(authTag)
    
    const plaintext = Buffer.concat(
        [decipher.update(enc, 'utf8'), decipher.final()]).toString()
    return JSON.parse(plaintext)
}


module.exports={encryptAlgo,decryptAlgo};