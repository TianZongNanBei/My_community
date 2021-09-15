"use strict";

// 1.计算出多少页
// 2.拆出数组里面的一些数据去渲染
// 3.添加页面滚动事件
// 4.当所有数据都展示后，便不再继续加载了
// 总页面
var togglePage = Math.ceil(893 / 12);
var listBox = document.querySelector('.list-box'); // console.log(listBox);
// const windowHeight = document.documentElement.scrollTop;

var windowHeight = document.documentElement.clientHeight;
var boxTop = listBox.offsetTop; // 当前页

var currentPage = 1; // 开关

var flag = true;

function renderHtml() {
  // 每次从数据库中截取12条数据
  var bindList = goodsData().slice((currentPage - 1) * 12, currentPage * 12);
  bindList.forEach(function (item, index) {
    var goodsDiv = document.createElement('div');
    goodsDiv.className = "col-md-4";
    goodsDiv.innerHTML = " <div class=\"card mb-4 shadow-sm\">\n            <img class=\"bd-placeholder-img card-img-top\" width=\"100%\" height=\"225\" src=\"".concat(item.goods_small_logo, "\">\n            <div class=\"card-body\">\n              <p class=\"card-text\" style=\"height: 72px\">").concat(item.goods_name, "</p>\n              <div class=\"d-flex justify-content-between align-items-center\">\n                <span class=\"text-muted h6 .text-danger\">\u5151\u6362\u79EF\u5206: ").concat(item.goods_price, "</span>\n                <div class=\"btn-group\">\n                  <button type=\"button\" class=\"btn btn-sm btn-outline-secondary\">\u7ACB\u5373\u8D2D\u4E70</button>\n                  <button type=\"button\" class=\"btn btn-sm btn-outline-secondary\">\u52A0\u5165\u8D2D\u7269\u8F66</button>\n                </div>\n              </div>\n            </div>\n          </div>");
    listBox.appendChild(goodsDiv);
  });
  flag = true;
}

renderHtml();

window.onscroll = function () {
  // 页面被卷去的头部+浏览器窗口的高度
  var scrollTop = document.documentElement.scrollTop + windowHeight; // 商品列表容器的高度+容器距离页面顶部的高度

  var boxHeight = listBox.offsetHeight + boxTop;
  console.log(scrollTop, boxHeight);
  if (scrollTop < boxHeight) return;
  if (currentPage >= togglePage) return;

  if (flag) {
    flag = false;
    currentPage++;
    renderHtml();
  }
};