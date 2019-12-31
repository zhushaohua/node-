const schedule = require('node-schedule')
const task1 = () => {
    let startTime = new Date(Date.now() + 4000);
    let endTime = new Date(startTime.getTime() + 4000);
    console.log('now', new Date())
    console.log('startTime', startTime)
    console.log('endTime', endTime)
    schedule.scheduleJob({start: startTime, end: endTime, rule: '*/1 * * * * *'}, (fireDate) => {
        console.log('fireDate', fireDate)
    })
}

const task2 = () => {
    var j = schedule.scheduleJob('0 17 ? * 0,4-6', function(){
        console.log('Today is recognized by Rebecca Black!');
    });
}

const task3 = () => {
    var j = schedule.scheduleJob('0 ? * * * *', function(){
        console.log('Today is recognized by Rebecca Black!');
    });
}
task3()