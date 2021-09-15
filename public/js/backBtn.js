 /**
  * root  布局根元素
  */

 class BackBtn {
     constructor(root = document.querySelector('body')) {
         this.root = root;
         //  console.log(root);
         this.createBtn();
         this.startListen();
     }
     createBtn() {
         const backBtn = document.createElement('button');
         this.root.appendChild(backBtn);
         //  此处是bootstrap样式
         backBtn.className = "btn btn-success";
         backBtn.innerText = "返回顶部";
         backBtn.style.position = "fixed";
         backBtn.style.bottom = "100px";
         backBtn.style.right = "20px";
         backBtn.style.display = "none";
         this.backBtn = backBtn;
     }

     startListen() {
         //  !!!!!!!!注意此处的this，否则影响下面的事件!!!!!!!!!!!
         const that = this;

         window.addEventListener('scroll', () => {
             if (document.documentElement.scrollTop >= 500) {
                 that.backBtn.style.display = "block"
             } else {
                 that.backBtn.style.display = "none"
             }
         })

         this.backBtn.addEventListener('click', () => {
             const timer = setInterval(function () {
                 document.documentElement.scrollTop -= 70;
                 if (document.documentElement.scrollTop <= 0) {
                     clearInterval(timer);
                 }
             }, 10);
         })



     }
 }

 new BackBtn()