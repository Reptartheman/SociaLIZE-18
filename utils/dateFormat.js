const dayjs = require('dayjs');

function showDateAndTime() {
    let datePlusTime = dayjs().format('M/DD/YYYY' + ' hh:mm:ss');
    let mongoDate = datePlusTime.toDate();
    console.log(`${datePlusTime}`);
}

module.exports = showDateAndTime();