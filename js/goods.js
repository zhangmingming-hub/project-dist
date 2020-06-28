let prodDatas = JSON.parse(localStorage.getItem("prodDatas"));
let id = location.search.split("=")[1];
let product = prodDatas[id];
let oDetail = document.getElementById("detail");
oDetail.innerHTML =
    `<div class="left">
        <div id = 'small'>
            <img src="${product.imgsrc}" alt="">
            <div id = 'mark'></div>
        </div>
        <div id = 'big'>
            <img src="${product.imgsrc}" alt="">
        </div>
    </div>
    <div class="right">
        <h3>${product.title}</h3>
        <br>
        <p>${product.price}</p>
        <p>
            <span class="minus">-</span>
            <input type="text" class="txt" value="1">
            <span class="plus">+</span>
        </p>
        <p>
            <input type="button" class="addBtn" value="加入购物车">
        </p>
        <a href="list.html">
            <input type="button" value="返回商品列表">
        </a>
    </div>`;
let oMinus = document.querySelector(".minus");
let oPlus = document.querySelector(".plus");
let oTxt = document.querySelector(".txt");
let oBtn = document.querySelector(".addBtn");
oMinus.onclick = function () {
    if (oTxt.value <= 1) {
        oTxt.value = 1;
        return;
    }
    oTxt.value--;
};
oTxt.onblur = () => {
    if (oTxt.value <= 1) {
        oTxt.value = 1;
    }
}
oPlus.onclick = function () {
    oTxt.value++;
};
let cart = new Cart();
oBtn.onclick = function () {
    cart.saveData(id, Number(oTxt.value), false);
    location.href = "cart.html";
};

// 放大镜效果代码
/*
    1、放大镜的布局
    2、放大，右边的大图片的位置，等价于左边遮罩层，反方向对应倍数的坐标。 */
$(function () {
    $("#small").mouseenter(function () {
        $("#mark,#big").show();
    }).mouseleave(function () {
        $("#mark,#big").hide();
    }).mousemove(function (ev) {
        var l = ev.pageX - $("#small").offset().left - 100;
        var t = ev.pageY - $("#small").offset().top - 100;
        //做一个简单的限制出界
        l = range(l, 0, 122);
        t = range(t, 0, 122);

        $("#mark").css({
            left: l,
            top: t
        });
        //大图片，按照对应倍数的反方向移动
        $("#big img").css({
            left: -2 * l,
            top: -2 * t
        })
    })
})

function range(iCur, iMin, iMax) {
    if (iCur < iMin) {
        return iMin;
    } else if (iCur > iMax) {
        return iMax;
    } else {
        return iCur;
    }
}