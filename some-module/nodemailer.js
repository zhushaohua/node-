'use strict'
const nodemailer = require('nodemailer');
const conf = require('../common/conf');
//QQ 的 host 是 smtp.qq.com；163 的 host 是 smtp.163.com


// egdtjaqnhkzsbifa
 
class email {

    constructor() {
        this.transporter = nodemailer.createTransport(conf.mail);
    }

    mailOptions(to,html) {
        return {
            from: `"星文" <${conf.mail.auth.user}>`,
            to: to, // list of receivers
            subject: '星文文化', // Subject line
            html: html // html body
        }
    }

    sendMail(html) {
        console.log(html)
        this.transporter.sendMail(this.mailOptions('348508486@qq.com', html), (error, info) => {
            if (error) {
                console.log('error ------------')
                return console.log(error);
            }
            console.log('success');

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });

    }
}

module.exports = new email();