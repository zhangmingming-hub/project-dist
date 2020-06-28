//登陆注册逻辑
class Index{
    constructor(){
        // 显示登录中的用户
        this.init();
        // 退出事件
        this.addEvent();
    }
    init(){
        // 获取之后，简单处理数据
        this.m = sessionStorage.getItem("userMsg");
        this.m = this.m ? this.m : null;
        // 如果有登录成功后的信息
        if(this.m){
            // 显示登录的用户名
            $("#userName").text(this.m);
            // 隐藏登录注册键
            $("#denglu").css({display:"none"});
            $("#zuce").css({display:"none"});
            // 显示用户名和退出键
            
            $("#userName").css({display:"inline-block"});
            $("#logout").css({display:"inline-block"});
        }
    }
    addEvent(){
        $("#logout").click(function(){
            sessionStorage.removeItem("userMsg");
            location.reload();
        })
    }
}
new Index();

//首页列表
let oProdList = document.getElementsByClassName("shop_ul_list")[0];
let prodDatas = JSON.parse(localStorage.getItem("prodDatas"));
let str = "";
for (let id in prodDatas) {
    str +=`<li>
                <dl>
                    <dt><a href="goods.html?id=${id}">
                    <img src="${prodDatas[id].imgsrc}" />
                    </a></dt>
                    <dd class="title"><a href="#">${prodDatas[id].title}</a></dd>
                    <dd class="content">
                        <span class="goods_jiage">￥<strong>${prodDatas[id].price}</strong></span>
                    </dd>
                </dl>
    </li>`;
}
oProdList.innerHTML = str;