require(["require.config"], () => {
    require(["jquery","url","tools","header","footer"], ($,url) => {
        class Register {
            constructor () {
                this.init();
            }
            init () {
                $(".go-reg").on("click", function () {
                    var username = $(".user-phone").val (),
                        password = $(".user-pwd").val ();
                    
                    $.ajax({
                        type : "POST",
                        url : url.phpbaseUrl + "register.php",
                        data : { username , password },
                        // 跨域语法
                        dataType:'json',
                        crossDomain: true,
                        success : function (res) {
                            if(res.res_code === 1){
                                if(confirm(res.res_message + "即将跳转至登录界面")){
                                    window.location = "login.html";
                                }
                            }else{
                                alert(res.res_message);
                            }
                        }
                    })
                })
            }
        }

        new Register();
    })
})