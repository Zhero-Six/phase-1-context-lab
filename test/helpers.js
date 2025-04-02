// helpers.js

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
  };
}

function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(dateTimeString) {
  const [date, hour] = dateTimeString.split(' ');
  this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour),
      date
  });
  return this;
}

function createTimeOutEvent(dateTimeString) {
  const [date, hour] = dateTimeString.split(' ');
  this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour),
      date
  });
  return this;
}

function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find(event => event.date === date);
  const timeOut = this.timeOutEvents.find(event => event.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(date) {
  const hours = this.hoursWorkedOnDate(date);
  return hours * this.payPerHour;
}

function allWagesFor() {
  const dates = this.timeInEvents.map(event => event.date);
  return dates.reduce((total, date) => total + this.wagesEarnedOnDate(date), 0);
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(employee => employee.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((total, employee) => total + employee.allWagesFor(), 0);
}

// Export all functions
module.exports = {
  createEmployeeRecord,
  createEmployeeRecords,
  createTimeInEvent,
  createTimeOutEvent,
  hoursWorkedOnDate,
  wagesEarnedOnDate,
  allWagesFor,
  findEmployeeByFirstName,
  calculatePayroll
};