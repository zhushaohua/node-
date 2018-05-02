const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const api = require('./api');


// const mailer = require('./some-module/nodemailer');

// setTimeout(function(){
  // mailer.sendMail('this is my test ~~,3秒之后发的哦');
// },3000)
// require('./phantomjs-node');
// app.use(bodyParser.json({limit: '1mb'}));  //这里指定参数使用 json 格式
app.use(bodyParser.json());  //这里指定参数使用 json 格式
app.use(bodyParser.urlencoded({
  extended: true
}));
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200); //让options请求快速返回/
  }
  else {
    next();
  }
});
// 设置静态界面
app.use('/static', express.static('web'))
// 设置静态文件夹
app.use('/uploadimg', express.static('uploadimg'))

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// 设置api接口
app.use('/api',api);


const server = app.listen(3000, 'localhost', function (error) {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
