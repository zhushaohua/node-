// const crypto = require('crypto');

// const hash = crypto.createHash('sha256');
// console.log(hash);
// hash.on('readable', () => {
//   const data = hash.read();
//   if (data) {
//     console.log(data.toString('hex'));
//     // Prints:
//     //   6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50
//   }
// });

// hash.write('some data to hash');
// hash.end();

const crypto = require('crypto');
const sha1 = crypto.createHash('sha1');

sha1.update('as');

console.log(sha1.digest('hex'));

var buf = crypto.randomBytes(16);
var secret = buf.toString("hex");//密钥加密；
console.log(buf)
console.log(secret)
var Signture = crypto.createHmac("sha1", secret);//定义加密方式
Signture.update('as');
var miwen=Signture.digest().toString("base64");//生成的密文后将再次作为明文再通过pbkdf2算法迭代加密；
console.log(miwen);
