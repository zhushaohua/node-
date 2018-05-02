const Mui = require('./mui.js');

class api{
	constructor(app,mysql){
		new Mui(app,mysql)
	}
}

module.exports = api;