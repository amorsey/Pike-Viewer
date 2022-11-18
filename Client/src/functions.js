import { daysOfTheWeek } from './constants'

export function parseWeekData(rawWeekData){
  // Generate dictionary using days of the week as keys
  const weekSchedule = daysOfTheWeek.reduce((map, day) => (map[day]=[], map), {});

  for(let i=0; i<rawWeekData.length; i++){
    let rawSessionData = rawWeekData[i]
    let startTimeObject = new Date(rawSessionData.start_at)
    let endTimeObject = new Date(rawSessionData.end_at)
    let weekDay = daysOfTheWeek[startTimeObject.getDay()]
    let people =  rawSessionData.people

    let sessionInfo =  {
      startTime: startTimeObject.toLocaleTimeString([], {timeStyle: 'short'}),
      endTime: endTimeObject.toLocaleTimeString([], {timeStyle: 'short'}),
      weekDay: startTimeObject.getDay(),
      nearHour: startTimeObject.getHours(),
      staff: rawSessionData.staff_members.map(staff => staff.name),
      event: rawSessionData.name,
      students: rawSessionData.people.map(student => student.name),
      date: startTimeObject.getDate(),
      topic: people.length < 1 ? "" : people[0].topic,
    }
    weekSchedule[weekDay].push(sessionInfo)
  }
  return weekSchedule
}
