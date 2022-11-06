module.exports = {
  getWeeklySessionsRequest: function (){
    const startTime = "00:00:00";
    const endTime = "23:59:59";
    const pikeAPI = "https://tcs-sanramon.pike13.com/api/v2/"
    const requestType = "desk/event_occurrences"

    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let lastSunday = new Date(today.setDate(today.getDate()-today.getDay()));
    let nextSaturday = new Date(today.setDate(today.getDate()-today.getDay()+6));
    let startYear = lastSunday.getFullYear()
    let startMonth = (lastSunday.getMonth() + 1).toString().padStart(2, '0');
    let startDay = lastSunday.getDate()
    let endYear = nextSaturday.getFullYear()
    let endMonth = (nextSaturday.getMonth() + 1).toString().padStart(2, '0');
    let endDay = nextSaturday.getDate()

    let fromRange = `from=${startYear}-${startMonth}-${startDay}T${startTime}Z`
    let toRange = `to=${endYear}-${endMonth}-${endDay}T${endTime}Z`
    let weekRequest = `${pikeAPI}${requestType}?${fromRange}&${toRange}`
    return weekRequest
  }
}

// console.log(module.exports.getWeeklySessionsRequest())
