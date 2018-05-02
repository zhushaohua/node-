

class t {
	constructor(){
		console.log('11');
		this.name = 'sb'
	}

	setName (name) {
		this.name = name;
	}
}
module.exports = new t();