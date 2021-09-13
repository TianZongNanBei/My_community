"use strict";

/**
 * 新增/修改cookie的值
 * @param {string} name cookie的名字
 * @param {string|number} value cookie的值
 * @param {string} expires cookie的过期时间
 */
function setCookie(name, value, expires) {
  if (expires) {
    document.cookie = "".concat(name, "=").concat(value, ";expires=").concat(expires);
  } else {
    document.cookie = "".concat(name, "=").concat(value, ";");
  }
}
/**
 * 根据用户传入的毫秒时间差构建并返回一个未来或过去的时间字符串
 * @param {number} timemillisDiffer 时间毫秒的差距 为正数时返回将来时间 为负数时返回的是过去时间
 * @returns 将来或过去的时间字符串
 */


function getTimeString(timemillisDiffer) {
  var newTimestamp = new Date().getTime() - 8 * 3600 * 1000 + timemillisDiffer;
  return new Date(newTimestamp).toString();
}
/**
 * 删除指定的cookie
 * @param {string} name 
 */


function deleteCookie(name) {
  document.cookie = "".concat(name, "='\u968F\u4FBF\u4EC0\u4E48\u53CD\u6B63\u662F\u8981\u8FC7\u671F';expires=").concat(getTimeString(-1));
}
/**
 * 根据名称查询cookie的值
 * @param {string} name 
 * @returns 该cookie的值
 */


function getCookie(name) {
  // console.log(document.cookie);//a=100; b=200; c=300; user={...}
  var arr = document.cookie.split("; "); //[a=100, b=200, c=300, user={...}]

  for (var i = 0; i < arr.length; i++) {
    var kv = arr[i].split("="); //[a,100]

    if (kv[0] === name) {
      return kv[1];
    }
  }
}

module.exports = {
  setCookie: setCookie,
  getTimeString: getTimeString,
  deleteCookie: deleteCookie,
  getCookie: getCookie
};