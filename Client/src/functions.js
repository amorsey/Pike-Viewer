function parseSessionData(rawSessionData){
  var sessionInfo =  {
    startTime: "",
    endTime: "",
    weekDay: null,
    nearHour: null,
    staff: [],
    event: "",
    students: [],
    date: null,
  }

  let startTimeObject = new Date(rawSessionData.start_at)
  let endTimeObject = new Date(rawSessionData.end_at)

  sessionInfo.startTime = startTimeObject.toLocaleTimeString()
  sessionInfo.endTime = endTimeObject.toLocaleTimeString()
  sessionInfo.weekDay = startTimeObject.getDay()
  sessionInfo.nearHour = startTimeObject.getHours()
  sessionInfo.event = rawSessionData.name
  sessionInfo.date = startTimeObject.getDate()

  let staffArray = rawSessionData.staff_members
  for(let staff = 0; staff < staffArray.length; staff++){
    sessionInfo.staff.push(staffArray[staff].name)
  }

  let studentArray = rawSessionData.people
  for(let student = 0; student < studentArray.length; student++){
    sessionInfo.students.push(studentArray[student].name)
  }

  return sessionInfo
}

function parseWeekData(rawWeekData){
  const weekSchedule = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  }

  const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]


  for(let event = 0; event < rawWeekData.length; event++){
    let rawSession = rawWeekData[event]
    let session = parseSessionData(rawSession)
    let day = weekDays[session.weekDay]
    weekSchedule[day].push(session)
  }

  return weekSchedule
}
