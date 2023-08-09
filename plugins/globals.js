import Vue from 'vue'

// export default ({app}, inject) => {
// Vue.prototype.$getCookie = (name) => {
//   var matches = document.cookie.match(new RegExp(
//     '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
//   ))
//   return matches ? decodeURIComponent(matches[1]) : undefined
// }
// Vue.prototype.$setCookie = (name, value, options) => {
//   options = options || {}

//   var expires = options.expires

//   if (typeof expires === 'number' && expires) {
//     var d = new Date()
//     d.setTime(d.getTime() + expires * 1000)
//     expires = options.expires = d
//   }
//   if (expires && expires.toUTCString) {
//     options.expires = expires.toUTCString()
//   }

//   value = encodeURIComponent(value)

//   var updatedCookie = name + '=' + value

//   for (var propName in options) {
//     updatedCookie += '; ' + propName
//     var propValue = options[propName]
//     if (propValue !== true) {
//       updatedCookie += '=' + propValue
//     }
//   }

//   document.cookie = updatedCookie
// }

// Vue.prototype.$deleteCookie = (name) => {
//   Vue.prototype.$setCookie(name, '', {
//     path: '/',
//     expires: -1
//   })
// }

Vue.prototype.$declOfNum = (n, titles) => {
  return titles[
    n % 10 === 1 && n % 100 !== 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
      ? 1
      : 2
  ]
}

// }
