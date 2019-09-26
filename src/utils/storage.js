export const SpCookie = {
  setCookie: (name, value, days, isZero) => {
    var date = new Date(),
      expires = '',
      days = Number(days)
    if (days) {
      if (isZero) {
        let curTemp = date.getTime()
        let curWeekHours = new Date(date.toLocaleDateString()).getTime() - 1
        let passedTimeStamp = curTemp - curWeekHours
        let leftTimeStamp = 24 * 60 * 60 * 1000 - passedTimeStamp
        let leftTime = new Date()
        leftTime.setTime(
          leftTimeStamp + curTemp + (days - 1) * 24 * 60 * 60 * 1000
        )
        expires = '; expires=' + leftTime.toGMTString()
      } else {
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = '; expires=' + date.toGMTString()
      }
    }
    document.cookie = name + '=' + value + expires + '; path=/'
  },
  getCookie: name => {
    let nameEQ = name + '='
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) == ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  },
  deleteCookie: name => {
    let date = new Date()
    date.setTime(date.getTime() - 10000)
    document.cookie =
      name + "= ' ' " + '; expires=' + date.toUTCString() + ';path=' + '/'
    document.cookie =
      name + "= ' ' " + '; expires=' + date.toUTCString() + ';path=' + '/'
  }
}
export const localhostStorageFn = {
  set: (key, value) => {
    let curTime = new Date().getTime()
    localStorage.setItem(key, JSON.stringify({ data: value, time: curTime }))
  },
  get: (key, exp, callback) => {
    let data = localStorage.getItem(key)
    if (data) {
      let dataObj = JSON.parse(data)
      if (!exp) {
        let dataObjDatatoJson = dataObj.data
        return dataObjDatatoJson
      }
      if (new Date().getTime() - dataObj.time > exp) {
        console.log('信息已过期')
        this.remove(key)
        callback && callback()
        // your callbak here
      } else {
        let dataObjDatatoJson = dataObj.data
        return dataObjDatatoJson
      }
    }
  },
  remove: key => {
    localStorage.removeItem(key)
  }
}
export function paddingLeftZero(num) {
  if (num < 10) {
    return '0' + num
  } else {
    return num
  }
}
