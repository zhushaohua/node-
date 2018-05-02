const base = require('./base.js');
const mui = require('./mui.js');
const user = require('./user.js')
const router = base.Router();
const sql = base.sql;
const utils = require('../common/utils.js')
router.use(async (req, res, next) => {
	// 路由管理
	if (req.body.username && req.body.token) {
		console.log(req.method, req.url);
		const result = await sql.T('user_info').search('*', {
				token: req.body.token,
				username: req.body.username
			})
		if (utils.isEmptyObject(result)) {
			return res.json(base.returnJson(200, 'token错误', "登录失效，请重新登录"));
		}
	}
	console.log(req.method, req.url);
	next();
})
router.use('/mui', mui)
router.use('/user', user)

module.exports = router;