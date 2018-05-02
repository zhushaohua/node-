var mysql      = require('mysql');
'use strict';

var pool = mysql.createPool({
	host:'localhost',
	user:'root',
	password:'123456',
	database:'xingwentest',
	port:'3306'
})
class sql{

	constructor(tableName) {
		this.tableName = tableName;

	}

	query (sql,options){
		return new Promise((res,rej) => {
			pool.query(sql,(err,results) => {
				if (err) {
					rej(err);
					console.log('错误');
				}else{
					res(results);
				}
			})
		});
	}



	search (object,other){
		var str = ''
		if (object) {
			str = 'WHERE';
			for (var variable in object) {
				if (object.hasOwnProperty(variable)) {
					str += ` ${variable}="${object[variable]}" AND`
				}
			}
			str = str.slice(0,-4);
			return this.query(`SELECT * FROM ${this.tableName} ${str} ${other}`);
		}else{
			return this.query(`SELECT * FROM ${this.tableName} ${other}`);
		}
	}
	insert (object) {
		var key = [],
			value = [];
		if (object) {
			var item = '';
			if (Array.isArray(object)) {
				if (object.length === 0) {
					console.log('这尼玛是个空值') 
					return object;
				}
				object.forEach(function(item, index){
					var vauleTmp = [];
					for (var variable in item) {
						if (index == 0) {
							key.push(variable);
						}
						vauleTmp.push(`"${item[variable]}"`);
					}
					vauleTmp = `(${vauleTmp.toString()})`;
					value.push(vauleTmp);
				})
			}
			key = key.toString();
			value = value.toString();
			var str = `INSERT INTO ${this.tableName}(${key}) VALUES${value}`;
			
			
			return this.query(str);
		}
		console.log('这尼玛是个空值')
	}
}
module.exports = {
	mui: function(){
		return new sql('mui');
	}
} 
/*
`
	create procedure procedureName()
	BEGIN
		drop table tamp_mui exists database
		create table tamp_mui
		select * from mui
		where 1=2;
		insert into tamp_mui (avatar,title,type,username) 
		values(1,2,3,4),(1,2,3,4);
		insert into mui (avatar,title,type,username)
		select avatar,title,type,username from tamp_mui
		
		// truncate table tmp_mui;
	END;
`
*/
/*
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : '',
database : 'xinwen',
port     : ''
});
//
connection.connect(function(err){
	if (err) {
		console.log('[query] - :' + err);
		return;
	}
	console.log('[connection connect] succeed');
});
var userAddsql = "INSERT INTO userinfo(Id,UserName,UserPass) VALUES(0,?,?)";
var userAddSql_params = ['wilson','abcd'];
//connection.query(userAddsql,userAddSql_params,function(err, rows, fields) {
//	if (err) {
//		console.log('[INSERT ERROR] -',err.message);
//		return;
//	};
//	console.log('-----------------------');
//	console.log('INSERT ID:',rows);
//});
connection.query('SELECT * FROM userinfo',function(err,res){
	if (err) {
		console.log('err:',err);
		return;
	}
	console.log('-------------');
	console.log(res);
	console.log('-------------');
})
connection.end(function(err){
	if (err) {
		console.log('[end] - :' + err);
		return;
	}
	console.log('[connection end] succeed');
});
//
*/
