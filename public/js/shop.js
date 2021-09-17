// 1.计算出多少页
// 2.拆出数组里面的一些数据去渲染
// 3.添加页面滚动事件
// 4.当所有数据都展示后，便不再继续加载了

// 总页数
const togglePage = Math.ceil(892 / 12);
const listBox = document.querySelector('.list-box');
// console.log(listBox);
// const windowHeight = document.documentElement.scrollTop;
const windowHeight = document.documentElement.clientHeight;
const boxTop = listBox.offsetTop;

// 当前页
let currentPage = 1;
// 开关
let flag = true;

function renderHtml() {
  // 每次从数据库中截取12条数据
  let bindList = goodsData.slice((currentPage - 1) * 12, currentPage * 12);

  bindList.forEach((item, index) => {
    const goodsDiv = document.createElement('div');
    goodsDiv.className = "col-md-4";
    goodsDiv.innerHTML =
      ` <div class="card mb-4 shadow-sm">
            <img class="bd-placeholder-img card-img-top" width="100%" height="225" src="${item.goods_small_logo}">
            <div class="card-body">
              <p class="card-text" style="height: 72px">${item.goods_name}</p>
              <div class="d-flex justify-content-between align-items-center">
                <span class="text-muted h6 .text-danger">兑换积分: ${item.goods_price}</span>
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary buyBtn" goodsId=${item.goods_id}>立即购买</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary carBtn" goodsId=${item.goods_id}>加入购物车</button>
                </div>
              </div>
            </div>
          </div>`
    listBox.appendChild(goodsDiv);
  })
  flag = true;
}
renderHtml()

window.onscroll = function () {
  // 页面被卷去的头部+浏览器窗口的高度
  const scrollTop = document.documentElement.scrollTop + windowHeight;
  // 商品列表容器的高度+容器距离页面顶部的高度
  const boxHeight = listBox.offsetHeight + boxTop;

  // console.log(scrollTop, boxHeight);

  if (scrollTop < boxHeight) return
  if (currentPage >= togglePage) return;

  if (flag) {
    flag = false;
    currentPage++;
    renderHtml();
  }

}

//加入购物车，获取产品相关信息，存进本地存储
// goodsData

let carList = JSON.parse(localStorage.getItem("car"));

if (!carList) {
  carList = [];
}

$(".container").on("click", ".carBtn", function () {
  const goodsId = parseInt($(this).attr("goodsId"));
  // console.log(goodsId);

  // 找出相对应的数据
  const cuttentGoods = goodsData.find((item) => {
    return item.goods_id === goodsId
  })

  // 判断购物车是否已经存在该商品
  const had = carList.some((item) => {
    return item.goods_id === cuttentGoods.goods_id;
  })

  // 如果没有，直接加入购物车，设置数量为 1
  if (!had) {
    carList.push(cuttentGoods);
    carList[carList.length - 1]["cart_number"] = 1;
  } else {
    //已经有了，数量+1
    const goodsIndex = carList.findIndex((item) => {
      return item.goods_id === goodsId
    })
    carList[goodsIndex]["cart_number"]++
  }
  localStorage.setItem("car", JSON.stringify(carList))
})

// 立即购买按钮

// buyBtn
$(".container").on("click", ".buyBtn", function () {
  alert("购买成功！");
})