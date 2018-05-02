var async = require('async')
// async.series({
// 	test1: function(callback){
// 		callback(null,1);
// 	},
// 	test2: function(callback){
// 		callback(null,2);
// 	}
// },function(err, results){
// 	//{ test1: 1, test2: 2 }
// 	console.log(results)
// })
// async.parallelLimit([
// 	function(callback){
// 		console.log('1')
// 		// callback(null, 'one','one','one');
// 		setTimeout(function(){
// 			console.log('11')
// 			callback(null, 'settimeOut1');
// 		},3000)
// 	},
// 	function(callback){
// 		console.log('2')
// 		setTimeout(function(){
// 			console.log('3')
// 			callback(null, 'settimeOut1');
// 		},3000)
// 	},
// 	function(callback){
// 		console.log('4')
// 		setTimeout(function(){
// 			console.log('4')
// 			callback(null, 'settimeOut1');
// 		},2000)
// 	}
// ],
// 2, //限制条数
// function(err, results){
// 	// 1 2 4 4 3   [ [ 'one', 'one', 'one' ], 'settimeOut1', 'settimeOut1' ]
// 	console.log(results);
// });

async.mapLimit([1,2,3,4],2,function(node,callback) {
	callback(null,node + 1);
},function(err, results) {
	console.log(results);
})