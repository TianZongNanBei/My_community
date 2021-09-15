"use strict";

var btn = document.querySelector('.btn'); // 验证邮箱是否已被注册

$(".form-signin").on("submit", function (e) {
  e.preventDefault();
  console.log($(this).serialize());
  var formData = $(this).serialize();
  $.ajax({
    type: "post",
    data: formData,
    url: "/register",
    dataType: "json",
    async: true,
    success: function success(data) {
      if (data.errCode === 1) {
        alert('此邮箱已被注册，请更改！');
      }

      if (data.errCode === 0) {
        alert('注册成功！');
        window.location.href = "/";
      }
    }
  });
});
var emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
var usernameReg = /^([a-zA-Z0-9_-]|[\u4E00-\u9FA5]){4,20}$/; // 邮箱验证

$(".emailIpt").on("input", function () {
  $(".emailHint").css("display", "inline-block");

  if (emailReg.test($(".emailIpt").val())) {
    btn.disabled = false;
    $(".emailHint").text("邮箱格式正确");
    $(".emailHint").css("color", "rgb(8, 121, 42)");
  } else {
    btn.disabled = true;
    $(".emailHint").text("邮箱格式格式未符合要求");
    $(".emailHint").css("color", "rgb(204, 33, 20)");
  }
}); // 用户名验证

$(".usernameIpt").on("input", function () {
  $(".usernameHint").css("display", "inline-block");

  if (usernameReg.test($(".usernameIpt").val())) {
    btn.disabled = false;
    $(".usernameHint").text("昵称格式正确");
    $(".usernameHint").css("color", "rgb(8, 121, 42)");
  } else {
    btn.disabled = true;
    $(".usernameHint").text("昵称格式未符合要求");
    $(".usernameHint").css("color", "rgb(204, 33, 20)");
  }
}); //  实现密码强度验证
//     -
//     弱： 只有数字\ 字母\ 特殊符号中的一种 -
//     中： 任意两种的组合 -
//     强： 数字 + 字母 + 特殊符号[_!@# $ % ^ & * ]

var reg1 = /[\d]+/;
var reg2 = /[a-zA-Z]+/;
var reg3 = /[_!@#\$%\^&\*]+/;
var reg4 = /[^\w!@#\$%\^&\*]+/;
var arr = ['密码强度弱', '密码强度中', '密码强度高'];
$(".pwdIpt").on("input", function () {
  $(".pwdHint").css("display", "inline-block");

  if ($(".pwdIpt").val().length < 6 || $(".pwdIpt").val().length > 12) {
    $(".pwdHint").text("密码应为6-12个字符");
    $(".pwdHint").css("color", "rgb(204, 33, 20)");
    btn.disabled = true;
    return;
  }

  if (reg4.test($(".pwdIpt").val())) {
    $(".pwdHint").text("含有非法字符");
    $(".pwdHint").css("color", "rgb(204, 33, 20)");
    btn.disabled = true;
    return;
  }

  var count = 0;

  if (reg1.test($(".pwdIpt").val())) {
    count++;
  }

  if (reg2.test($(".pwdIpt").val())) {
    count++;
  }

  if (reg3.test($(".pwdIpt").val())) {
    count++;
  }

  $(".pwdHint").text(arr[count - 1]);
  $(".pwdHint").css("color", "rgb(8, 121, 42)");
  btn.disabled = false;
});