$("#login_btn").click(function(){
    $.get("http://jx.xuzhixiang.top/ap/api/login.php",{
        username: $("#userName_ipt").val(),
        password:$("#pwd_ipt").val(),
    },(data)=>{
        console.log(data);
        if(data.code === 1){
            sessionStorage.setItem("userMsg",$("#userName_ipt").val());
            location.href = "./index.html";
        }else{
            alert(data.msg);
        }
    });
});