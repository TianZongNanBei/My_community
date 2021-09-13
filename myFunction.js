    // 获得随机整数
    function getRandomNumber(num1, num2) {
        return num1 + Math.round(Math.random() * (num2 - num1));
    }

    // 获得随机颜色  n==10为10进制rgb颜色，n==16为16进制颜色
    function getRandomColor(n) {
        var red = getRandomNumber(0, 255);
        var green = getRandomNumber(0, 255);
        var blue = getRandomNumber(0, 255);
        if (n === 10) {
            var color = `rgb(${red}, ${green}, ${blue})`;
        } else if (n === 16) {
            red = red.toString(16);
            green = green.toString(16);
            blue = blue.toString(16);
            var color = '#' + red + green + blue;
        }
        return color;
    }

    // 某时间与现在的倒计时
    function countDown(date) {
        var timer = setInterval(function () {
            var secondsGap = (date - new Date()) / 1000;
            var dates = parseInt(secondsGap / 60 / 60 / 24);
            var hours = parseInt(secondsGap / 60 / 60 % 24);
            var minutes = parseInt(secondsGap / 60 % 60);
            var seconds = parseInt(secondsGap % 60);
            dates = dates < 10 ? '0' + dates : dates;
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            if (secondsGap <= 0) {
                clearInterval(timer);
            }
            var arr = [dates, hours, minutes, seconds];
            console.log(arr);
            return arr;
        }, 1000)
    }



    // 动画函数   obj对象  target 目标位置  callback回调函数
    function animate(obj, target, callback) {
        // 先清除以前的定时器，避免叠加导致速度过快
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                clearInterval(obj.timer);
                // 如果有回调函数就会执行回调函数
                if (callback) {
                    callback();
                }
            } else {
                obj.style.left = obj.offsetLeft + step + 'px';
            }
        }, 15)
    }

    // 从数组或者字符串中随机获得一个元素
    function getRandomItem(arr) {
        return arr[getRandomNumber(0, arr.length - 1)];
    }

    function getLengthStr(num, leg) {
        let str = '';
        for (let i = 0; i < leg - (num + '').length; i++) {
            str += '0';
        }
        return str += num;
    }

    // 生成随机姓名
    function getRandomName() {
        const firstName = '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜';
        const secondNmae = '氢氦锂铍硼碳氮氧氟氖钠镁铝硅磷硫氯氩钾钙';
        const thirdNmae = '零一二三四五六七八九';
        return `${getRandomItem(firstName)}${getRandomItem(secondNmae)}${getRandomItem(thirdNmae)}`
    }


    /**
     * 多属性动画函数
     * @param {*} element        DOM元素
     * @param {*} targetObj     目标属性的对象集合
     * @param {*} useTime       动画耗时
     * @param {*} callback      回调函数
     */

    // move(con, {
    //     left: '500px',
    //     top: '800px',
    //     opacity: '0'
    // }, 2000, function () {
    //     console.log('动画完成了！！！');
    // })

    function move(element, targetObj, useTime, callback) {
        // 定义每一帧的耗时
        const zhenHaoshi = 20;

        // 计算出总的帧数
        const zongZhenShu = Math.round(useTime / zhenHaoshi);

        // 定义当前帧数，开始为0
        let dangqianiZhen = 0;

        // 提取单位的正则
        const regDanwei = /[\d\.]+([a-z]*)/;

        let canShuObj = {};

        // {left:'500px',top:'500px'}
        for (let attr in targetObj) {
            // 提取属性目标值
            const mubiaozhi = parseFloat(targetObj[attr]);
            // 获取属性初始值
            const chushizhi = parseFloat(getComputedStyle(element)[attr]);
            // 计算每一帧中属性值的变化量
            const sudu = (mubiaozhi - chushizhi) / zongZhenShu;
            canShuObj[attr] = [chushizhi, sudu];
        }

        const timer = setInterval(function () {
            dangqianiZhen++;

            for (let attr in targetObj) {
                // 提取单位
                const danWei = regDanwei.exec(targetObj[attr])[1];

                // 每一帧都让属性值变化
                element.style[attr] = canShuObj[attr][0] + canShuObj[attr][1] * dangqianiZhen + danWei;

            }

            if (dangqianiZhen >= zongZhenShu) {

                clearInterval(timer);

                callback && callback();
            }

        }, zhenHaoshi)

        // 最后加一帧，对误差进行暴力纠正
        setTimeout(function () {
            for (let attr in targetObj) {

                element.style[attr] = targetObj[attr];
            }

        }, useTime + zhenHaoshi)

    }


    // 输出当前的时间信息, 格式： yyyy - MM - dd HH: mm: ss
    function getTime() {
        const nowTime = new Date();
        const year = nowTime.getFullYear().toString();
        const month = (nowTime.getMonth() + 1).toString().padStart(2, '0');
        const dates = nowTime.getDate().toString().padStart(2, '0');
        const hours = nowTime.getHours().toString().padStart(2, '0');
        const minutes = nowTime.getMinutes().toString().padStart(2, '0');
        const seconds = nowTime.getSeconds().toString().padStart(2, '0');
        return (` ${year}-${month}-${dates} ${hours}:${minutes}:${seconds}`);
    }

    module.exports = {
        getTime
    }