const phantom = require('phantom');
// const fs = require('fs');
// const utils = require('../common/utils.js');
// const sql = require('../mysql');
// const muiEvaluate = require('./mui.js');
// const muiSql = sql.mui();
const URL = 'http://ask.dcloud.net.cn/explore/'
async function open(url, evaluateFn) {
	return new Promise(async function(res, rej) {
		try{
			if (!url) {
				console.log('url 为空')
				return false
			};

			const instance = await phantom.create();
			const page = await instance.createPage();

			const status = await page.open(url);

			if (status == 'fail') {
				console.log('status 为fail')
				await instance.exit();
				return false; 
			}

			await page.includeJs("https://cdn.bootcss.com/jquery/1.12.4/jquery.js")

			var result = await page.evaluate(evaluateFn)
			await instance.exit();
			res(result)
		}
		catch(e) {
			rej(e);
		}
	})
}
module.exports = open;
/*
async function open(url) {
	if (!url) {return false};
	const instance = await phantom.create();
	const page = await instance.createPage();
	if (!muiData) {
		muiData = await muiSql.query('select * from mui order by id desc limit 10')
		// console.log(muiData);
	}
	await page.on('onResourceRequested', function(requestData) {
		// console.log('Requesting',requestData.url);
	})
	const status = await page.open(url);
	console.log(`status:${status}`)
	if (status == 'fail') {
		await instance.exit();
		return false; 
	}
	var result = await page.evaluate(muiEvaluate)
	index++;
	// data = data.concat(result);
	
	if (index < limitCount) {
		// console.log('wancheng');
		// console.log(data);
		try {
			var result = utils.deReplication(result,muiData,'url');
			var res = await muiSql.insert(result.reverse())
			muiData = muiData.concat(result).slice(-20);
			setTimeout(() => {
				open(url);
			},time)
			// console.log(res);
			console.log(index);
		}catch(e){
			console.log(e);
		}

		// await saveToFile('./data.txt',JSON.stringify(data));
		// await instance.exit();
	} else {
		console.log(result.next);
		open('http:' + result.next)
	}
}
 */



