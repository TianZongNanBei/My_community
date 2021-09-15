"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * root  布局根元素
 * str   按钮的文字
 * callback 回调函数
 * 依赖jquery 淡入效果
 * 依赖bootstrap 提供css样式
 */
var HintBtn =
/*#__PURE__*/
function () {
  function HintBtn(root, str, callback) {
    _classCallCheck(this, HintBtn);

    this.root = root || document.querySelector('body');
    this.str = str || "成功!";
    this.callback = callback; //    console.log(this.root, this.str, this.callback);

    this.createBtn();
    this.showBtn();
  }

  _createClass(HintBtn, [{
    key: "createBtn",
    value: function createBtn() {
      var hintBtn = document.createElement('button');
      this.root.appendChild(hintBtn); //  此处是bootstrap样式

      hintBtn.className = "btn btn-success";
      hintBtn.innerText = this.str;
      hintBtn.style.position = "fixed";
      hintBtn.style.top = "10px";
      hintBtn.style.left = "50%";
      hintBtn.style.transform = "translateX(-50%)";
      hintBtn.style.display = "none";
      this.hintBtn = hintBtn;
    }
  }, {
    key: "showBtn",
    value: function showBtn() {
      $(this.hintBtn).fadeIn(800, this.callback);
    }
  }]);

  return HintBtn;
}(); //  new HintBtn()