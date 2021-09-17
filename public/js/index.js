// 底部新闻资讯模块
const newsMoudle = document.querySelector('.newsMoudle');
const newsBox = document.querySelector('.newsBox');
const moreNews = document.querySelector('.moreNews');
const postMoudle = document.querySelector('.postMoudle');

// 换一批功能

$(".newsChange").on("click", function (e) {

  console.log('被点击了');
  $.ajax({
    type: "get",
    url: "../public/js/NewData.json",
    dataType: "json",
    async: true,
    success: function (data) {
      const randomaArr = getRandomArr(0, data.length - 1, 10);
      const dataArr = [];
      randomaArr.forEach(item => {
        dataArr.push(data[item]);
      })
      randerPage(dataArr);
    }
  })

})

function randerPage(dataArr) {
  newsBox.innerHTML = '';
  let str = '';
  dataArr.forEach(item => {

    str += ` 
        <div class="media text-muted pt-3 border-bottom border-gray newsItem">
         
          <img class="bd-placeholder-img mr-2 rounded" width="45" height="45" src="${item.thumbnail_pic_s}">
         
          <p class="media-body pb-3 mb-0 small lh-125 ml-3">
            <a href="${item.url}"><strong class="d-block text-gray-dark h6">${item.title}</strong></a>

          </p>

          <div class="text-right mt-3">
            <span class="h6">来源：${item.author_name}</span><br>
            <span class="h6">${item.date}</span>
          </div>

        </div>
        `
  })
  newsBox.innerHTML = str;
}

//加载更多功能

$(".moreNews").on("click", function (e) {

  console.log('更多被点击了');
  $.ajax({
    type: "get",
    url: "../public/js/NewData.json",
    dataType: "json",
    async: true,
    success: function (data) {
      const randomaArr = getRandomArr(0, data.length - 1, 10);
      const dataArr = [];
      randomaArr.forEach(item => {
        dataArr.push(data[item]);
      })
      randerMore(dataArr);
    }
  })


})

function randerMore(dataArr) {

  dataArr.forEach(item => {
    let str = '';
    const newsItem = document.createElement('div');
    newsItem.className = "media text-muted pt-3 border-bottom border-gray newsItem";
    str += ` 
          <img class="bd-placeholder-img mr-2 rounded" width="45" height="45" src="${item.thumbnail_pic_s}">
         
          <p class="media-body pb-3 mb-0 small lh-125 ml-3">
            <a href="${item.url}"><strong class="d-block text-gray-dark h6">${item.title}</strong></a>

          </p>

          <div class="text-right mt-3">
            <span class="h6">来源：${item.author_name}</span><br>
            <span class="h6">${item.date}</span>
          </div>
        `
    newsItem.innerHTML = str;
    newsBox.appendChild(newsItem);
  })
}

// 导航栏点击变色
$(".nav-underline>a").on('click', function () {
  $(this).addClass("nav-active").siblings().removeClass("nav-active");
})

// 页面滚动到新闻资讯

$(".newsBtn").on('click', function () {

  // console.log(newsMoudle.offsetTop);
  // console.log(document.documentElement.scrollTop);
  if (document.documentElement.scrollTop < newsMoudle.offsetTop - 50) {

    const timer = setInterval(function () {
      document.documentElement.scrollTop += 30;
      if (document.documentElement.scrollTop >= newsMoudle.offsetTop - 100) {
        clearInterval(timer);
      }
    }, 10);

  } else if (document.documentElement.scrollTop > newsMoudle.offsetTop + 160) {

    const timer = setInterval(function () {
      document.documentElement.scrollTop -= 30;
      if (document.documentElement.scrollTop <= newsMoudle.offsetTop - 60) {
        clearInterval(timer);
      }
    }, 10);
  }

})


//页面滚动到社区热帖
$(".postBtn").on('click', function () {
  // console.log(postMoudle, postMoudle.offsetTop);
  // console.log(document.documentElement.scrollTop);
  if (document.documentElement.scrollTop > postMoudle.offsetTop - 50) {
    const timer = setInterval(function () {
      document.documentElement.scrollTop -= 30;
      if (document.documentElement.scrollTop <= postMoudle.offsetTop - 50) {
        clearInterval(timer);
      }
    }, 10);
  }
})