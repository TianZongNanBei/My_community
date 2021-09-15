"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * root  布局根元素
 */
var BackBtn =
/*#__PURE__*/
function () {
  function BackBtn() {
    var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.querySelector('body');

    _classCallCheck(this, BackBtn);

    this.root = root; //  console.log(root);

    this.createBtn();
    this.startListen();
  }

  _createClass(BackBtn, [{
    key: "createBtn",
    value: function createBtn() {
      var backBtn = document.createElement('button');
      this.root.appendChild(backBtn); //  此处是bootstrap样式

      backBtn.className = "btn btn-success";
      backBtn.innerText = "返回顶部";
      backBtn.style.position = "fixed";
      backBtn.style.bottom = "100px";
      backBtn.style.right = "20px";
      backBtn.style.display = "none";
      this.backBtn = backBtn;
    }
  }, {
    key: "startListen",
    value: function startListen() {
      //  !!!!!!!!注意此处的this，否则影响下面的事件!!!!!!!!!!!
      var that = this;
      window.addEventListener('scroll', function () {
        if (document.documentElement.scrollTop >= 500) {
          that.backBtn.style.display = "block";
        } else {
          that.backBtn.style.display = "none";
        }
      });
      this.backBtn.addEventListener('click', function () {
        var timer = setInterval(function () {
          document.documentElement.scrollTop -= 70;

          if (document.documentElement.scrollTop <= 0) {
            clearInterval(timer);
          }
        }, 10);
      });
    }
  }]);

  return BackBtn;
}();

new BackBtn();