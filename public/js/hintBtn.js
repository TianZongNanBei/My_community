 /**
  * root  布局根元素
  * str   按钮的文字
  * callback 回调函数
  * 依赖jquery 淡入效果
  * 依赖bootstrap 提供css样式
  */

 class HintBtn {
     constructor(root, str, callback) {
         this.root = root || document.querySelector('body');
         this.str = str || "成功!";
         this.callback = callback;
         //    console.log(this.root, this.str, this.callback);
         this.createBtn();
         this.showBtn();
     }
     createBtn() {
         const hintBtn = document.createElement('button');
         this.root.appendChild(hintBtn);
         //  此处是bootstrap样式
         hintBtn.className = "btn btn-success";
         hintBtn.innerText = this.str;
         hintBtn.style.position = "fixed";
         hintBtn.style.top = "10px";
         hintBtn.style.left = "50%";
         hintBtn.style.transform = "translateX(-50%)";
         hintBtn.style.display = "none";
         this.hintBtn = hintBtn;
     }

     showBtn() {

         $(this.hintBtn).fadeIn(800, this.callback)
     }
 }

 //  new HintBtn()