/* Your Code Here */
// index.js

// Creates an employee record from an array
function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Creates multiple employee records from an array of arrays
function createEmployeeRecords(employeesData) {
    return employeesData.map(employee => createEmployeeRecord(employee));
}

// Adds a timeIn event to an employee record using 'this'
function createTimeInEvent(dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });
    return this;
}

// Adds a timeOut event to an employee record using 'this'
function createTimeOutEvent(dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });
    return this;
}

// Calculates hours worked on a specific date using 'this'
function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date);
    const timeOut = this.timeOutEvents.find(event => event.date === date);
    
    if (timeIn && timeOut) {
        return (timeOut.hour - timeIn.hour) / 100;
    }
    return 0;
}

// Calculates wages earned on a specific date using 'this'
function wagesEarnedOnDate(date) {
    const hours = hoursWorkedOnDate.call(this, date);
    return hours * this.payPerHour;
}

// Calculates total wages for all dates using 'this'
function allWagesFor() {
    const dates = this.timeInEvents.map(event => event.date);
    return dates.reduce((total, date) => {
        return total + wagesEarnedOnDate.call(this, date);
    }, 0);
}

// Finds an employee by first name from a collection
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

// Calculates total payroll for all employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => {
        return total + allWagesFor.call(record);
    }, 0);
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

