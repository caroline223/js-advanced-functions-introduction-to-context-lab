// Your code here

function createEmployeeRecord(array){
    let employeeInfo
    return employeeInfo = {
        firstName: array[0],
        familyName:  array[1],
        title: array[2],
        payPerHour:  array[3],
        timeInEvents: [],
        timeOutEvents:  [],
    }
}

function createEmployeeRecords(employee){
    return employee.map(function(array){
        return createEmployeeRecord(array)
    })
}

function createTimeInEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(" ")

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

function createTimeOutEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(" ")

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

function hoursWorkedOnDate(employee, dateSpecific){
    let start = employee.timeInEvents.find(function(e){
        return e.date === dateSpecific
    })

    let end = employee.timeOutEvents.find(function(e){
        return e.date === dateSpecific
    })
    return (end.hour - start.hour) / 100
}

function wagesEarnedOnDate(employee, dateSpecific){
    let wages = employee.payPerHour * hoursWorkedOnDate(employee, dateSpecific)
    return parseFloat(wages.toString())
}

function allWagesFor(employee){
    let daysWorked = employee.timeInEvents.map(function(e){
        return e.date
    })

    let paidWages = daysWorked.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    },0)
    return paidWages
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(function(record){
        return record.firstName === firstName
    })
}

function calculatePayroll(arrOfEmployeeRecords){
    return arrOfEmployeeRecords.reduce(function(memo, record){
        return memo + allWagesFor(record)
    }, 0)
}