class Base{
	constructor (app,mysql){
		this.app = app;
		this.mysql = mysql;
	}

	returnJson (code,data,msg) {
	  return {
	    retcode:code,
	    data:data,
	    msg:msg
	  }
	}
}

module.exports = Base;