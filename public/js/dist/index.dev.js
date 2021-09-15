"use strict";

// 底部新闻资讯模块
var newsBox = document.querySelector('.newsBox');
var moreNews = document.querySelector('.moreNews'); // 换一批功能

$(".newsChange").on("click", function (e) {
  console.log('被点击了');
  $.ajax({
    type: "get",
    url: "../public/js/NewData.json",
    dataType: "json",
    async: true,
    success: function success(data) {
      var randomaArr = getRandomArr(0, data.length - 1, 10);
      var dataArr = [];
      randomaArr.forEach(function (item) {
        dataArr.push(data[item]);
      });
      randerPage(dataArr);
    }
  });
});

function randerPage(dataArr) {
  newsBox.innerHTML = '';
  var str = '';
  dataArr.forEach(function (item) {
    str += " \n        <div class=\"media text-muted pt-3 border-bottom border-gray newsItem\">\n         \n          <img class=\"bd-placeholder-img mr-2 rounded\" width=\"45\" height=\"45\" src=\"".concat(item.thumbnail_pic_s, "\">\n         \n          <p class=\"media-body pb-3 mb-0 small lh-125 ml-3\">\n            <a href=\"").concat(item.url, "\"><strong class=\"d-block text-gray-dark h6\">").concat(item.title, "</strong></a>\n\n          </p>\n\n          <div class=\"text-right mt-3\">\n            <span class=\"h6\">\u6765\u6E90\uFF1A").concat(item.author_name, "</span><br>\n            <span class=\"h6\">").concat(item.date, "</span>\n          </div>\n\n        </div>\n        ");
  });
  newsBox.innerHTML = str;
} //加载更多功能


$(".moreNews").on("click", function (e) {
  console.log('更多被点击了');
  $.ajax({
    type: "get",
    url: "../public/js/NewData.json",
    dataType: "json",
    async: true,
    success: function success(data) {
      var randomaArr = getRandomArr(0, data.length - 1, 10);
      var dataArr = [];
      randomaArr.forEach(function (item) {
        dataArr.push(data[item]);
      });
      randerMore(dataArr);
    }
  });
});

function randerMore(dataArr) {
  dataArr.forEach(function (item) {
    var str = '';
    var newsItem = document.createElement('div');
    newsItem.className = "media text-muted pt-3 border-bottom border-gray newsItem";
    str += " \n          <img class=\"bd-placeholder-img mr-2 rounded\" width=\"45\" height=\"45\" src=\"".concat(item.thumbnail_pic_s, "\">\n         \n          <p class=\"media-body pb-3 mb-0 small lh-125 ml-3\">\n            <a href=\"").concat(item.url, "\"><strong class=\"d-block text-gray-dark h6\">").concat(item.title, "</strong></a>\n\n          </p>\n\n          <div class=\"text-right mt-3\">\n            <span class=\"h6\">\u6765\u6E90\uFF1A").concat(item.author_name, "</span><br>\n            <span class=\"h6\">").concat(item.date, "</span>\n          </div>\n        ");
    newsItem.innerHTML = str;
    newsBox.appendChild(newsItem);
  });
} // 导航栏


$(".nav-underline>a").on('click', function () {
  $(this).addClass("nav-active").siblings().removeClass("nav-active");
});