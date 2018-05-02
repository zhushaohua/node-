'use strict'
const crypto = require('crypto');
const base = require('./base.js');
const utils = require('../common/utils.js');
const router = base.Router();
const sql =  base.sql;

// 查询个人信息
router.post('/userinfo', async (req, res) => {
    try{
        const token = req.body.token;
        
        if (utils.isEmpty(token)) {
            return res.json(base.returnJson(10001,'token不存在',"未登录"));
        }

        const results = await sql.T('user_info').search('username,real_name,email,sex', {
            token:token
        });

        if (utils.isEmptyObject(results)) {
            return res.json(base.returnJson(200, 'token错误', "登录失效，请重新登录"));
        }

        return res.json(base.returnJson(200, results[0], "查询成功"));
    }catch(e){
        return res.json(base.returnJson(10004, e, "服务器错误"));
    }
})

router.post('/register', async (req, res) => {
    try{
        const username = req.body.username,
              real_password = req.body.password;

        if (utils.isEmpty(username) || utils.isEmpty(real_password)) {
            return res.json(base.returnJson(10001,'error',"请填写完整信息"));
        }


        const isExist = await sql.T('user_info').search('*', {'username':username})
        if (!utils.isEmptyObject(isExist)) {
            return res.json(base.returnJson(10002,'error',"改账号已存在，请重新输入账号"));
        }
        
        const password = utils.sha1(req.body.password)

        const results = sql.T('user_info').insert({
            username: username,
            password: password,
            real_password: real_password
        })

        res.json(base.returnJson(200, 'success', "注册成功"));
    }catch(e){
        return res.json(base.returnJson(10004, e, "服务器错误"));
    }
})

router.post('/login', async (req, res) => {
    try{
        const username = req.body.username,
              real_password = req.body.password;

        if (utils.isEmpty(username) || utils.isEmpty(real_password)) {
            return res.json(base.returnJson(10001, 'error', "请填写完整信息"));
        }

        // 获取加密密码
        const password = utils.sha1(req.body.password)
        const isExist = await sql.T('user_info').search('*', {
            username: username,
            password: password
        })
        if (utils.isEmptyObject(isExist)) {
            return res.json(base.returnJson(10003, 'error', "账号或密码错误"));
        }

        // 获取token
        const token = utils.hmac(password);
        const update = await sql.query(`update user_info set token="${token}" where username="${username}"`)
        if (update.changedRows == 0) {
            return res.json(base.returnJson(200, update, "更新失败"));
        }

        const results = await sql.T('user_info').search('username,token', {
            username:username
        });

        return res.json(base.returnJson(200, results[0], "登录成功"));
    }catch(e){
        return res.json(base.returnJson(10004, e, "服务器错误"));
    }
})


module.exports = router;
/*
/ 注册
app.post('/register',(req,res) => {
    const name = req.body.name;
    const psw = req.body.psw;
    if (!checkName(req.body)) return res.status(200).json(checkName(req.body));
    sql.search({'name':name}).then((rows) => {
        if (rows.length) {
            res.status(200).json(returnJson(10002,"error","该账号已注册"));
        }else {
            sql.insert({'name':name,'psw':psw}).then((results) => {
              res.status(200).json(returnJson(200,"success","请求成功"));
            }).catch((err) => console.log(err));
        }
        console.log(rows);
    })
})
// 登陆
app.post('/login',(req,res) =>{
    if (!checkName(req.body)) return res.status(200).json(checkName(req.body));
    sql.search({name:req.body.name,psw:req.body.psw})
        .then((rows) => {
            if (rows.length) {
                res.status(200).json(returnJson(200,"success","登陆成功"));
            }else{
                res.status(200).json(returnJson(10003,"error","账号或密码错误"));
            }
        })
})
// 修改密码

app.post('/edit_psw',(req,res) => {
    const name = req.body.name;
    const psw = req.body.psw;
    if (!checkName(req.body)) return res.status(200).json(checkName(req.body));
    sql.query(`UPDATE userinfo SET psw='${psw}' WHERE name="${name}"`)
        .then((rows) => {
            if (rows.affectedRows > 0) {
                res.status(200).json(returnJson(200,"success","修改成功"));
            }else{
                res.status(200).json(returnJson(10003,"error","修改失败"));
            }
        }).catch((err) =>{
            console.log(err);
        })
})
*/