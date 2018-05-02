const express = require('express');
const base = require('./base.js');
const router = base.Router();
const sql =  base.sql;

router.post('/explore_list', async (req, res) => {
	const page = req.body.page || 0,
		  count = req.body.count || 10;
	const results = await sql.T('mui').search('*', null, `order by id desc limit ${page*count},${count}`);
	
	res.status(200).json(base.returnJson(200,results,"请求成功"))
})

// class mui extends Base {
// 	constructor(app,mysql) {
// 		super(app,mysql);

// 		this.app.post('/mui/explore_list',async (req,res) => {
// 			const page = req.body.page || 0,
// 				  count = req.body.count || 10;
// 			const results = await mysql.search(null,`order by id desc limit ${page*count},${count}`);
// 			res.status(200).json(this.returnJson(200,results,"请求成功"))
// 		})
// 		this.app.post('/mui/upload_img', this.upload().single('file'), (req,res) => {
// 			if (req.file) {
// 				return res.json(this.returnJson(200,'success', '上传成功'))
// 			}
// 			res.status(200).json(this.returnJson(200,'err', '上传失败'))
// 		})
// 	}
// }
module.exports = router;
