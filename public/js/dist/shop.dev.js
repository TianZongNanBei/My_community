"use strict";

// 1.计算出多少页
// 2.拆出数组里面的一些数据去渲染
// 3.添加页面滚动事件
// 4.当所有数据都展示后，便不再继续加载了
// 总页数
var togglePage = Math.ceil(892 / 12);
var listBox = document.querySelector('.list-box'); // console.log(listBox);
// const windowHeight = document.documentElement.scrollTop;

var windowHeight = document.documentElement.clientHeight;
var boxTop = listBox.offsetTop; // 当前页

var currentPage = 1; // 开关

var flag = true;

function renderHtml() {
  // 每次从数据库中截取12条数据
  var bindList = goodsData.slice((currentPage - 1) * 12, currentPage * 12);
  bindList.forEach(function (item, index) {
    var goodsDiv = document.createElement('div');
    goodsDiv.className = "col-md-4";
    goodsDiv.innerHTML = " <div class=\"card mb-4 shadow-sm\">\n            <img class=\"bd-placeholder-img card-img-top\" width=\"100%\" height=\"225\" src=\"".concat(item.goods_small_logo, "\">\n            <div class=\"card-body\">\n              <p class=\"card-text\" style=\"height: 72px\">").concat(item.goods_name, "</p>\n              <div class=\"d-flex justify-content-between align-items-center\">\n                <span class=\"text-muted h6 .text-danger\">\u5151\u6362\u79EF\u5206: ").concat(item.goods_price, "</span>\n                <div class=\"btn-group\">\n                  <button type=\"button\" class=\"btn btn-sm btn-outline-secondary buyBtn\" goodsId=").concat(item.goods_id, ">\u7ACB\u5373\u8D2D\u4E70</button>\n                  <button type=\"button\" class=\"btn btn-sm btn-outline-secondary carBtn\" goodsId=").concat(item.goods_id, ">\u52A0\u5165\u8D2D\u7269\u8F66</button>\n                </div>\n              </div>\n            </div>\n          </div>");
    listBox.appendChild(goodsDiv);
  });
  flag = true;
}

renderHtml();

window.onscroll = function () {
  // 页面被卷去的头部+浏览器窗口的高度
  var scrollTop = document.documentElement.scrollTop + windowHeight; // 商品列表容器的高度+容器距离页面顶部的高度

  var boxHeight = listBox.offsetHeight + boxTop; // console.log(scrollTop, boxHeight);

  if (scrollTop < boxHeight) return;
  if (currentPage >= togglePage) return;

  if (flag) {
    flag = false;
    currentPage++;
    renderHtml();
  }
}; //加入购物车，获取产品相关信息，存进本地存储
// goodsData


var carList = JSON.parse(localStorage.getItem("car"));

if (!carList) {
  carList = [];
}

$(".container").on("click", ".carBtn", function () {
  var goodsId = parseInt($(this).attr("goodsId")); // console.log(goodsId);
  // 找出相对应的数据

  var cuttentGoods = goodsData.find(function (item) {
    return item.goods_id === goodsId;
  }); // 判断购物车是否已经存在该商品

  var had = carList.some(function (item) {
    return item.goods_id === cuttentGoods.goods_id;
  }); // 如果没有，直接加入购物车，设置数量为 1

  if (!had) {
    carList.push(cuttentGoods);
    carList[carList.length - 1]["cart_number"] = 1;
  } else {
    //已经有了，数量+1
    var goodsIndex = carList.findIndex(function (item) {
      return item.goods_id === goodsId;
    });
    carList[goodsIndex]["cart_number"]++;
  }

  localStorage.setItem("car", JSON.stringify(carList));
}); // 立即购买按钮
// buyBtn

$(".container").on("click", ".buyBtn", function () {
  alert("购买成功！");
});