const weekDays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
]

export function parseWeekData(rawWeekData){
  const weekSchedule = {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  }

  for(let i=0; i<rawWeekData.length; i++){
    let rawSessionData = rawWeekData[i]
    let startTimeObject = new Date(rawSessionData.start_at)
    let endTimeObject = new Date(rawSessionData.end_at)
    let weekDay = weekDays[startTimeObject.getDay()]

    let sessionInfo =  {
      startTime: startTimeObject.toLocaleTimeString(),
      endTime: endTimeObject.toLocaleTimeString(),
      weekDay: startTimeObject.getDay(),
      nearHour: startTimeObject.getHours(),
      staff: rawSessionData.staff_members.map(staff => staff.name),
      event: rawSessionData.name,
      students: rawSessionData.people.map(student => student.name),
      date: startTimeObject.getDate(),
    }
    weekSchedule[weekDay].push(sessionInfo)
  }
  console.log(weekSchedule)
  return weekSchedule
}
