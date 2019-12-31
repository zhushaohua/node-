const pako = require('pako')

function test1(params) {
    let test = { my: 'super', puper: [456, 567], awesome: 'pako' };

    // 缩小 === 压缩
    let binaryString = pako.deflate(JSON.stringify(test))

    // 放大 === 解压
    let res = pako.inflate(binaryString, {to: 'string'})
    console.log(binaryString)
    console.log(res)
}

test1()