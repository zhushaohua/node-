const crypto = require('crypto');

module.exports = class {

	sha1 (str) {
		const sha1 = crypto.createHash('sha1');
		sha1.update(str);
		return sha1.digest('hex');
	}

	hmac (str) {
		const buf = crypto.randomBytes(16); //随机buf
		const secret = buf.toString('hex'); //秘钥加密
		const signture = crypto.createHmac('sha1', secret); //定义加密方式
		signture.update(str);
		return signture.digest().toString('base64');//生成的密文后将再次作为明文再通过pbkdf2算法迭代加密；
	}
}