// const schedule = require('node-schedule');

const open = require('./index');
const utils = require('../common/utils.js')
const nodemailer = require('../some-module/nodemailer');
const URL = 'http://ask.dcloud.net.cn/explore/'
const sql = require('../mysql');
const muiSql = sql.T('mui');
let data = null,
	time = 5000;
let evaluateFn = function() {
		var content = $('.aw-item').map(function(){
						return {
							avatar: $(this).find('.aw-user-name img').attr('src'),
							title: $(this).find('h4 a:first').text().replace(/\n|\t/g,''),
							username: $(this).find('.aw-question-content .aw-user-name').text(),
							type: $(this).find('h4 .aw-topic-name').text(),
							url: $(this).find('h4 a:first').attr('href'),
						}
				   }).toArray()
		return content;
	}
async function start(){
	try {
		if (!data) {
			data = await muiSql.query('select * from mui order by id desc limit 10')
		}
		let result = await open(URL,evaluateFn)
		result = utils.deReplication(result,data,'url');
		let res = await muiSql.insert(result.reverse())
		data = data.concat(result).slice(-20);
		setTimeout(() => {
			start();
		},time)
	}
	catch(e) {
		let str = '报错了：报错信息为：'
		str += JSON.stringify(e);
		nodemailer.sendMail(str);
	}
}
start()
module.exports = start;
