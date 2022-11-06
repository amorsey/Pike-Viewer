module.exports = {
  generateSessionsRequest: function (){
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
  },
  generateAuthRequest: function (code, redirect_uri, client_id, client_secret){
    let oauthLink = "https://pike13.com/oauth/token"
    let grantType = "?grant_type=authorization_code"
    let authCode = `&code=${code}`
    let redirectURI = `&redirect_uri=${redirect_uri}`
    let clientID = `&client_id=${client_id}`
    let clientSecret = `&client_secret=${client_secret}`
    let authRequest = (
        oauthLink +
        grantType +
        authCode +
        redirectURI +
        clientID +
        clientSecret
    )
    return authRequest
  }
}

// console.log(module.exports.getWeeklySessionsRequest())
