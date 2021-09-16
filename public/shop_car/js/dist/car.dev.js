"use strict";

// 渲染
var goodsBox = document.querySelector(".cart-item-list");
var carList = JSON.parse(localStorage.getItem("car")); // console.log(carList);

var goodsStr = '';
carList.forEach(function (item) {
  goodsStr += "\n     <div class=\"cart-item\" goodsId=".concat(item.goods_id, ">\n                        <div class=\"p-checkbox\">\n                            <input type=\"checkbox\" name=\"\" id=\"\" class=\"j-checkbox\">\n                        </div>\n                        <div class=\"p-goods\">\n                            <div class=\"p-img\">\n                                <img src=\"").concat(item.goods_small_logo, "\" width=\"80\" height=\"80\">\n                            </div>\n                            <div class=\"p-msg\">").concat(item.goods_name, "</div>\n                        </div>\n                        <div class=\"p-price\">\uFFE5").concat(item.goods_price, "</div>\n                        <div class=\"p-num\">\n                            <div class=\"quantity-form\">\n                                <a href=\"javascript:;\" class=\"decrement\">-</a>\n                                <input type=\"number\" class=\"itxt\" value=\"").concat(item.cart_number, "\" oninput=\"if(value<1)value=1\">\n                                <a href=\"javascript:;\" class=\"increment\">+</a>\n                            </div>\n                        </div>\n                        <div class=\"p-sum\">\uFFE5").concat(item.goods_price * item.cart_number, "</div>\n                        <div class=\"p-action\"><a href=\"javascript:;\">\u5220\u9664</a></div>\n                    </div>\n    ");
});
goodsBox.innerHTML = goodsStr;
/**
 * 处理购物车数据
 */
// 全选控制单选

$(".checkall").change(function () {
  $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
  getSum();
  $(this).prop("checked") ? $(".cart-item").addClass("check-cart-item") : $(".cart-item").removeClass("check-cart-item");
}); // 单选控制全选

$(".j-checkbox").change(function () {
  if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
    $(".checkall").prop("checked", true);
  } else {
    $(".checkall").prop("checked", false);
  }

  getSum();
  $(this).prop("checked") ? $(this).parents(".cart-item").addClass("check-cart-item") : $(this).parents(".cart-item").removeClass("check-cart-item");
}); // 增减商品数量模块

$(".increment").click(function () {
  // 输入框数量变化
  var count = $(this).siblings(".itxt").val();
  count++;
  $(this).siblings(".itxt").val(count); // 小计价格变化

  var price = $(this).parents(".p-num").siblings(".p-price").text().substring(1);
  $(this).parents(".p-num").siblings(".p-sum").text('￥' + (price * count).toFixed(2));
  getSum();
});
$(".decrement").click(function () {
  var count = $(this).siblings(".itxt").val();

  if (count == 1) {
    if (confirm('是否将该商品移出购物车？')) {
      var goodsId = $(this).parents(".cart-item").attr("goodsId") * 1;
      var goodsIndex = carList.findIndex(function (item) {
        return item.goods_id === goodsId;
      });
      console.log(goodsIndex);
      carList.splice(goodsIndex, 1);
      localStorage.setItem("car", JSON.stringify(carList));
      $(this).parents(".cart-item").remove();
    }

    return;
  }

  count--;
  $(this).siblings(".itxt").val(count);
  var price = $(this).parents(".p-num").siblings(".p-price").text().substring(1);
  $(this).parents(".p-num").siblings(".p-sum").text('￥' + (price * count).toFixed(2));
  getSum();
}); // 输入框数值改变

$(".itxt").bind("input propertychange", function () {
  console.log(1);
  var price = $(this).parents(".p-num").siblings(".p-price").text().substring(1);
  $(this).parents(".p-num").siblings(".p-sum").text('￥' + ($(this).val() * price).toFixed(2));
  getSum();
}); // 总计模块 

getSum();

function getSum() {
  var count = 0;
  var sum = 0;
  $(".j-checkbox:checked").parents(".p-checkbox").siblings(".p-num").find(".itxt").each(function (index, ele) {
    // 计算出总的件数
    count += parseInt($(ele).val());
  });
  $(".amount-sum em").text(count);
  $(".j-checkbox:checked").parents(".p-checkbox").siblings(".p-sum").each(function (index, ele) {
    sum += parseFloat($(ele).text().substring(1));
  });
  $(".price-sum em").text("￥" + sum.toFixed(2));
}
/**
 * 删除模块
 */
// 右侧删除


$(".p-action a").click(function () {
  var goodsId = $(this).parents(".cart-item").attr("goodsId") * 1;
  var goodsIndex = carList.findIndex(function (item) {
    return item.goods_id === goodsId;
  });
  console.log(goodsIndex);
  carList.splice(goodsIndex, 1);
  localStorage.setItem("car", JSON.stringify(carList));
  $(this).parents(".cart-item").remove();
  getSum();
}); // 删除选中的商品

$(".remove-batch").click(function () {
  var goodsIds = [];
  $(".j-checkbox:checked").parents(".cart-item").each(function (index, item) {
    goodsIds.push($(item).attr("goodsId") * 1);
  });
  console.log(goodsIds);
  goodsIds.forEach(function (item, index) {
    var goodsIndex = carList.findIndex(function (e) {
      return e.goods_id === goodsIds[index];
    });
    console.log(goodsIndex);
    carList.splice(goodsIndex, 1);
    localStorage.setItem("car", JSON.stringify(carList));
  });
  $(".j-checkbox:checked").parents(".cart-item").remove();
  getSum();
}); // 底部清空购物车

$(".clear-all").click(function () {
  $(".cart-item").remove();
  getSum();
  localStorage.removeItem("car");
});