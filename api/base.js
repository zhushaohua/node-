const express = require('express');
const multer = require('./multerUtil.js');
const sql = require('../mysql');
class Base{
	constructor () {
		this.express = express;
		this.sql = sql;
	}

	returnJson (code,data,msg) {
	  return {
	    retcode:code,
	    data:data,
	    msg:msg
	  }
	}

	// 上传图片的
	multer (desc) {
		return multer.instance(desc);
	}

	upload (desc) {
		return this.multer(desc||'./uploadimg');
	}

	Router () {
		return express.Router();
	}


}

module.exports = new Base();