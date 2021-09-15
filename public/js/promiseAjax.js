function ajax(options) {
    // 请求方式应有默认值
    // 如果本次ajax失败 想办法把错误信息告知用户 如果用户没有配fail回调 也配一个默认的
    const defaultOptions = {
        url: options.url,
        method: options.method || "GET",
        data: options.data || "",
        success: options.success,
        fail:
            options.fail ||
            function (err) {
                console.log("发现错误", err);
            },
    };

    try {
        /* 校验用户的options是否合法 如果不合法 要善意地提醒ta 以把锅甩给ta */
        if (!options.url) {
            // 抛出一个错误 以提示调用者 url必须传
            // 抛一个错误的目的 是为了让调用者知道错在哪了 好纠正
            throw new Error("url必须设置");
        }

        // 兼容请求方式的大小写 POST post pOst
        defaultOptions.method = defaultOptions.method.toUpperCase();

        // 请求方式支持支GET或POST
        if (
            !(
                defaultOptions.method === "GET" ||
                defaultOptions.method === "POST"
            )
        ) {
            throw new Error("请求方式只支持GET或POST");
        }

        // 请求参数 兼容"username=admin&pwd=123456" 与{username:"admin",pwd:"123456"} 格式错误时应予以提示
        if (
            !(
                Object.prototype.toString.call(defaultOptions.data) ===
                    "[object String]" ||
                Object.prototype.toString.call(defaultOptions.data) ===
                    "[object Object]"
            )
        ) {
            throw new Error("请求参数必须为string或object");
        }

        // 兼容object {name:"admin",pwd:"123456"}  转成 name=admin&pwd=123456
        if (
            Object.prototype.toString.call(defaultOptions.data) ===
            "[object Object]"
        ) {
            // 拼接查询字符串
            let queryString = "";
            for (const attr in defaultOptions.data) {
                queryString += `${attr}=${defaultOptions.data[attr]}&`;
            }
            // 锯掉最后一个&
            queryString = queryString.slice(0, -1);
            defaultOptions.data = queryString;
            console.log(defaultOptions.data);
        }

        // success参数必备 否则无法返回数据给调用者
        if (!defaultOptions.success) {
            throw new Error("成功回调函数success必须配置");
        }

        // success及fail必须为函数类型
        if (
            !(
                Object.prototype.toString.call(defaultOptions.success) ===
                    "[object Function]" &&
                Object.prototype.toString.call(defaultOptions.fail) ===
                    "[object Function]"
            )
        ) {
            throw new Error("success及fail回调必须为函数类型");
        }

        const xhr = new XMLHttpRequest();
        // xhr.open("GET","./server.php?username=admin&pwd=123456")

        if (options.method === "POST") {
            xhr.open(defaultOptions.method, defaultOptions.url);
            xhr.setRequestHeader(
                "Content-Type",
                "application/x-www-form-urlencoded"
            );
            xhr.send(defaultOptions.data);
        } else {
            xhr.open(
                defaultOptions.method,
                defaultOptions.url + "?" + defaultOptions.data
            );
            xhr.send();
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                // console.log(xhr.responseText);
                defaultOptions.success(xhr.responseText);
            }
        };
    } catch (error) {
        defaultOptions.fail(error);
    }
}

function promiseAjax(options) {
    // 将AJAX任务裹在一个Promise里面，方便以后=>   then(下一步动作)
    return new Promise((resolve, reject) => {

        // 该Promise承诺：按照options的配置 帮我们完成一个AJAX任务 
        // 成功以后把结果往下传=> resolve(res) 或者把错误汇报=> reject(err)
        ajax({
            url: options.url,
            method: options.method,
            data: options.data,

            // 如果成功，结果向后传（then）
            success(res) {
                resolve(res);
            },

            // 如果失败，原因向后传（catch）
            fail(err) {
                reject(err);
            },           
        });

    });
}
