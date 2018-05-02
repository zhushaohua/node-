const Base = require('./base-api.js');
class mui extends Base {
	constructor(app,mysql) {
		super(app,mysql);
		this.app.get('/explore_list',(req,res) => {
			res.status(200).json(this.returnJson(200,"success","请求成功"))
		})

		this.app.post('add_data',async (req,res) => {
			
		})
	}
}
module.exports = mui;
