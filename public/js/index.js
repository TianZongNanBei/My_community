const newsBox = document.querySelector('.newsBox');

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
    ajaxGetData();
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