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

    // In the case of more than 1 student I'm just using the topic of the...
    // first one for now.
    let check = (people.length < 1 || typeof(people[0].topic) == "undefined")
    let sessionInfo =  {
      startTime: startTimeObject.toLocaleTimeString([], {timeStyle: 'short'}),
      endTime: endTimeObject.toLocaleTimeString([], {timeStyle: 'short'}),
      weekDay: startTimeObject.getDay(),
      nearHour: startTimeObject.getHours(),
      date: startTimeObject.getDate(),
      staff: rawSessionData.staff_members.map(staff => staff.name),
      event: rawSessionData.name,
      students: people.map(student => student.name),
      date: startTimeObject.getDate(),
      topic: check ? "" : people[0].topic,
    }
    weekSchedule[weekDay].push(sessionInfo)
  }
  return weekSchedule
}


export function firstUpper(string){
  if( string.length > 0 ){
    return string[0].toUpperCase() + string.substring(1)
  }else {
    return ""
  }
}
