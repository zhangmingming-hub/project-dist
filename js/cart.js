class Cart {
    constructor() {
        this.cartData = localStorage.getItem("cartData") ? JSON.parse(localStorage.getItem("cartData")) : {};

    }

    //在loaclStorage中保存数据，并且判断传过来的num是需要累加的还是直接用的
    saveData(id, num, terminal) {
        if (!this.cartData[id] || terminal) {
            this.cartData[id] = num;
        } else {
            this.cartData[id] += num;
        }
        localStorage.setItem("cartData", JSON.stringify(this.cartData));
    };

    //将购物车添加至界面
    showList(domobj) {
        this.domobj = domobj;
        let proDatas = JSON.parse(localStorage.getItem("prodDatas"));
        
        if(localStorage.getItem("cartData")==""){
            return;
        }
        let cartData = JSON.parse(localStorage.getItem("cartData"));

        let str = "";
        for (let id in cartData) {
            str += `<tr data-id = "${id}">
                    <td><input type="checkbox" class="ck"></td>
                    <td><a href="detail.html?id=${id}"><img src="${proDatas[id].imgsrc}" alt = ""></a></td>
                    <td>${proDatas[id].title}</td>
                    <td class = "price">${proDatas[id].price}</td>
                    <td>
                        <span class="minus">-</span>
                        <input type="text" class="num" value="${cartData[id]}">
                        <span class="plus">+</span>
                    </td>
                    <td class = "perPrices">${proDatas[id].price * cartData[id]}</td>
                    <td class="del">删除</td>
                </tr>`;
        }
        if (str == "") {
            str = `<td colspan = "7">购物车是空的，快去<a href = "index.html">买点东西</a>犒赏自己吧</td>`;
        }
        domobj.innerHTML = str;
    };
    //选择框
    checkAll(id) {
        let oCheckAll = document.getElementById(id);
        let aCks = document.querySelectorAll(".ck");
        oCheckAll.onclick = () => {
            for (let i = 0; i < aCks.length; i++) {
                aCks[i].checked = oCheckAll.checked;
            }
            this.getTotalPrice("totalPrice");
        };
        for (let i = 0; i < aCks.length; i++) {
            aCks[i].onclick = () => {
                var cont = 0;
                for (let j = 0; j < aCks.length; j++) {
                    if (aCks[j].checked) {
                        cont++
                    }
                }
                if (cont == aCks.length) {
                    oCheckAll.checked = true;
                } else {
                    oCheckAll.checked = false;
                }
                this.getTotalPrice("totalPrice");
            }
        }
    }

    //更新数据
    updataData() {
        let that = this;
        this.aMinus = document.querySelectorAll(".minus");
        this.aPlus = document.querySelectorAll(".plus");
        this.aNums = document.querySelectorAll(".num");
        this.aPrice = document.querySelectorAll(".price");
        this.aPerPrice = document.querySelectorAll(".perPrices");
        this.aCks = document.querySelectorAll(".ck");

        for (let i = 0; i < this.aMinus.length; i++) {
            //减
            this.aMinus[i].onclick = () => {
                let id = this.aMinus[i].parentNode.parentNode.getAttribute("data-id");
                if (this.aNums[i].value <= 1) {
                    this.aNums[i].value = 1;
                    return;
                }
                this.aNums[i].value--;
                this.saveData(id, Number(this.aNums[i].value), true);
                getPerPrice(i);
                this.getTotalPrice("totalPrice");
            };
            //加
            this.aPlus[i].onclick = () => {
                let id = this.aPlus[i].parentNode.parentNode.getAttribute("data-id");
                this.aNums[i].value++;
                this.saveData(id, Number(this.aNums[i].value), true);
                getPerPrice(i);
                this.getTotalPrice("totalPrice");
            }
            //改
            this.aNums[i].onchange = () => {
                let id = this.aNums[i].parentNode.parentNode.getAttribute("data-id");
                if (this.aNums[i].value <= 1) {
                    this.aNums[i].value = 1;
                }
                this.saveData(id, Number(this.aNums[i].value, false));
                getPerPrice(i);
                this.getTotalPrice("totalPrice");
            }
        }
        //得到每个商品的总价
        function getPerPrice(i) {
            that.aPerPrice[i].innerText = that.aNums[i].value * that.aPrice[i].innerText;
        }
    }
    //得到总价
    getTotalPrice(id) {
        let oTotalPrice = document.getElementById(id);
        let totalPrice = 0;
        for (let i = 0; i < this.aCks.length; i++) {
            if (this.aCks[i].checked) {
                totalPrice += Number(this.aPerPrice[i].innerText);
            }
        }
        oTotalPrice.innerHTML = `你选择的商品总价为${totalPrice}元 <button id="buttonEnd">结算</button>`;

        //结算
            if((`${totalPrice}`) > 0){
                $("#buttonEnd").click((e) => {
                    alert("已经购买，等待收货吧！");
                    localStorage.setItem("cartData","");
                    location.href = "./index.html";
                });
            }
    
    }
    //删除商品
    removeData() {
        let aDelbtns = document.querySelectorAll(".del");
        for (let i = 0; i < aDelbtns.length; i++) {
            aDelbtns[i].onclick = () => {
                if(!confirm("是否确定删除该商品？")){
                    return;
                }else{
                    let id = aDelbtns[i].parentNode.getAttribute("data-id");
                    this.domobj.removeChild(aDelbtns[i].parentNode);
                    delete this.cartData[id];
                    localStorage.setItem("cartData", JSON.stringify(this.cartData));
                    this.aCks[i].checked = false;
                    this.getTotalPrice("totalPrice");
                }
            }
        }
    }
}