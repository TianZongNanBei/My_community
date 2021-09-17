// 渲染购物车
const goodsBox = document.querySelector(".cart-item-list");
const carList = JSON.parse(localStorage.getItem("car"));
// console.log(carList);
if (!carList || carList.length === 0) {
    goodsBox.innerHTML = `<h1>您的购物车空空如也...快去选购吧！</h1>`;
} else {
    let goodsStr = ''
    carList.forEach((item) => {
        goodsStr += `
     <div class="cart-item" goodsId=${item.goods_id}>
                        <div class="p-checkbox">
                            <input type="checkbox" name="" id="" class="j-checkbox">
                        </div>
                        <div class="p-goods">
                            <div class="p-img">
                                <img src="${item.goods_small_logo}" width="80" height="80">
                            </div>
                            <div class="p-msg">${item.goods_name}</div>
                        </div>
                        <div class="p-price">￥${item.goods_price}</div>
                        <div class="p-num">
                            <div class="quantity-form">
                                <a href="javascript:;" class="decrement">-</a>
                                <input type="number" class="itxt" value="${item.cart_number}" oninput="if(value<1)value=1">
                                <a href="javascript:;" class="increment">+</a>
                            </div>
                        </div>
                        <div class="p-sum">￥${item.goods_price*item.cart_number}</div>
                        <div class="p-action"><a href="javascript:;">删除</a></div>
                    </div>
    `
    })
    goodsBox.innerHTML = goodsStr;
}

// 显示购物车为空
function renderEmpty() {
    if (!carList || carList.length === 0) {
        goodsBox.innerHTML = `<h1>您的购物车空空如也...快去选购吧！</h1>`;
    }
}

/**
 * 处理购物车数据
 */

// 全选控制单选
$(".checkall").change(function () {
    $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
    getSum();
    $(this).prop("checked") ? $(".cart-item").addClass("check-cart-item") : $(".cart-item").removeClass("check-cart-item");
});

// 单选控制全选
$(".j-checkbox").change(function () {
    if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
        $(".checkall").prop("checked", true);
    } else {
        $(".checkall").prop("checked", false);
    }
    getSum();
    $(this).prop("checked") ? $(this).parents(".cart-item").addClass("check-cart-item") : $(this).parents(".cart-item").removeClass("check-cart-item");

});

// 增减商品数量模块
$(".increment").click(function () {
    // 输入框数量变化
    let count = $(this).siblings(".itxt").val();
    count++;
    $(this).siblings(".itxt").val(count);
    // 小计价格变化
    const price = $(this).parents(".p-num").siblings(".p-price").text().substring(1);
    $(this).parents(".p-num").siblings(".p-sum").text('￥' + (price * count).toFixed(2));
    getSum();
});

$(".decrement").click(function () {
    let count = $(this).siblings(".itxt").val();
    if (count == 1) {
        if (confirm('是否将该商品移出购物车？')) {
            const goodsId = $(this).parents(".cart-item").attr("goodsId") * 1;
            const goodsIndex = carList.findIndex((item) => {
                return item.goods_id === goodsId;
            })
            carList.splice(goodsIndex, 1)
            localStorage.setItem("car", JSON.stringify(carList));
            $(this).parents(".cart-item").remove();
            renderEmpty()
        }
        return;
    }
    count--;
    $(this).siblings(".itxt").val(count);
    const price = $(this).parents(".p-num").siblings(".p-price").text().substring(1);
    $(this).parents(".p-num").siblings(".p-sum").text('￥' + (price * count).toFixed(2));
    getSum();
});
// 输入框数值改变
$(".itxt").bind("input propertychange", function () {
    console.log(1);
    const price = $(this).parents(".p-num").siblings(".p-price").text().substring(1);
    $(this).parents(".p-num").siblings(".p-sum").text('￥' + ($(this).val() * price).toFixed(2));
    getSum();
});

// 总计模块 
getSum();

function getSum() {
    let count = 0;
    let sum = 0;
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
    const goodsId = $(this).parents(".cart-item").attr("goodsId") * 1;
    const goodsIndex = carList.findIndex((item) => {
        return item.goods_id === goodsId;
    })
    console.log(goodsIndex);
    carList.splice(goodsIndex, 1)
    localStorage.setItem("car", JSON.stringify(carList));
    $(this).parents(".cart-item").remove();
    getSum();
    renderEmpty()
})

// 删除选中的商品
$(".remove-batch").click(function () {
    const goodsIds = [];
    $(".j-checkbox:checked").parents(".cart-item").each((index, item) => {
        goodsIds.push($(item).attr("goodsId") * 1);
    })
    console.log(goodsIds);
    goodsIds.forEach((item, index) => {
        const goodsIndex = carList.findIndex((e) => {
            return e.goods_id === goodsIds[index];
        })
        console.log(goodsIndex);
        carList.splice(goodsIndex, 1)
        localStorage.setItem("car", JSON.stringify(carList));
    })

    $(".j-checkbox:checked").parents(".cart-item").remove();
    getSum();
    renderEmpty()
})

// 底部清空购物车
$(".clear-all").click(function () {
    // $(".cart-item").remove();
    getSum();
    localStorage.removeItem("car");
    goodsBox.innerHTML = `<h1>您的购物车空空如也...快去选购吧！</h1>`;
})


// 点击结算
// btn-area

$(".btn-area").click(function () {

    if (($(".price-sum em").text().substring(1) * 1) !== 0) {
        alert("购买成功！");
        const goodsIds = [];
        $(".j-checkbox:checked").parents(".cart-item").each((index, item) => {
            goodsIds.push($(item).attr("goodsId") * 1);
        })
        console.log(goodsIds);
        goodsIds.forEach((item, index) => {
            const goodsIndex = carList.findIndex((e) => {
                return e.goods_id === goodsIds[index];
            })
            console.log(goodsIndex);
            carList.splice(goodsIndex, 1)
            localStorage.setItem("car", JSON.stringify(carList));
        })

        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
        renderEmpty()
    } else {
        alert("请您确认购物车，勾选需要结算的商品！");
    }
})