$(function () {
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
            confirm('是否将该商品移出购物车？') && $(this).parents(".cart-item").remove();
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
    // 删除模块
    $(".p-action a").click(function () {
        $(this).parents(".cart-item").remove();
        getSum();
    })
    $(".remove-batch").click(function () {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    })
    $(".clear-all").click(function () {
        $(".cart-item").remove();
        getSum();
    })


});