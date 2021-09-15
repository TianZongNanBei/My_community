"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BackBtn =
/*#__PURE__*/
function () {
  function BackBtn(root) {
    _classCallCheck(this, BackBtn);

    this.root = root;
    this.findElement();
    this.startListen();
  }

  _createClass(BackBtn, [{
    key: "findElement",
    value: function findElement() {
      this.tabs = this.root.querySelectorAll('ul>li');
      this.contents = this.root.querySelectorAll('ol>li');
    }
  }, {
    key: "startListen",
    value: function startListen() {
      var that = this;

      for (var i = 0; i < this.tabs.length; i++) {
        this.tabs[i].index = i;

        this.tabs[i].onclick = function () {
          for (var j = 0; j < that.tabs.length; j++) {
            that.tabs[j].classList.remove('active');
            that.contents[j].classList.remove('active');
          }

          this.classList.add('active');
          that.contents[this.index].classList.add('active');
        };
      }
    }
  }]);

  return BackBtn;
}();