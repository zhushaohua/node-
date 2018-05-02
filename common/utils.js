'use strict';
const crypto = require('./crypto.js');
class utils{

	constructor() {
		this.extendClass(this,crypto);
	}

	// 合并class
	extendClass (mainClass, newClass) {
		var a = new newClass()
		for (let i of Object.getOwnPropertyNames(Object.getPrototypeOf(a))) {
			if (i !== 'constructor' || !mainClass[i]) {
				mainClass[i] = a[i];
			}
		}
	}

	// 去除重复
	deReplication(arr1,arr2,str) {
		const len = arr2.length;
		if (!arr1 && !arr1.length) return arr1;
		if (len === 0) return arr1;
		return	arr1.filter(function(obj){
					var isHas = false;
					for (var i = 0; i < len; i++) {
						if (arr2[i][str] == obj[str]) {
							isHas = true;
							break;
						}
					}
					return !isHas;
				})
	}

	isEmpty (o) {
		if (undefined === o || 
			false === o ||
			null === o ||
			'' === o) {
			return true;
		}
		return false;
	}

	isEmptyObject (o) {
		if (this.isEmpty(o)) return true;
		for (var p in o) {
			if (p !== undefined) {
				return false;
			}
		}
		return true;
	}
}

module.exports = new utils();