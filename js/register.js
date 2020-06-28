$(function () {
    $("#button").click(function(){
    $.get("http://jx.xuzhixiang.top/ap/api/reg.php", {
        username: $(".username").val(),
        password: $(".password").val()
    },(data)=>{
        console.log(data);
        if(data.code==0){
            alert("用户名已存在,请重新注册")
            location.reload();
        }else{
            alert("注册成功，跳转登录！")
            location.href = "./login.html";
        }
        
    })
})
})