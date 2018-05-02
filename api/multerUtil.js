const multer = require('multer');
// 上传文件
// const storage = multer.diskStorage({
// 	// 设置上传后文件路径，uploads文件夹会自动创建。
// 	destination: './uploads/' ,
// 	// 给上传文件重命名，获取添加后缀名，
// 	filename: function (req, file, cb) {
// 		const fileFormat = (file.originalname).split('.');
// 		cb(null, `${file.fieldname}-${Date.now()}.${fileFormat.pop()}`);
// 	}
// });

// const upload = multer({
// 	storage: storage
// });
// multer.single('file')
class multerUtils{
	constructor(desc) {

	}

	instance(desc) {
		return multer({
			storage: this.storage(desc)
		})
	}


	storage(desc) {
		console.log(desc);
		return	multer.diskStorage({
			// 设置上传后文件路径，uploads文件夹会自动创建。
			destination: desc ,
			// 给上传文件重命名，获取添加后缀名，
			filename: function (req, file, cb) {
				const fileFormat = (file.originalname).split('.');
				cb(null, `${file.fieldname}-${Date.now()}.${fileFormat.pop()}`);
			}
		});
	}
}
module.exports = new multerUtils();