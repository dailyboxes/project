require(["require.config"], () => {
    require(["jquery","url","tools","header","footer"], ($,url) => {
        class Login {
            constructor () {
                this.init();
            }
            init () {
                $("#login-btn").on("click", function () {
                    var username = $(".user-text").val(),
                        password = $(".user-pwd").val(),
                        check = $(".no-check")[0];

                    $.ajax({
                        type : "POST",
                        url : url.phpbaseUrl+"login.php",
                        data : {username, password},
                        // 跨域语法
                        dataType:'json',
                        crossDomain: true,
                        success : function (res) {
                            if (res.res_code === 1) {
                                if(check.checked){
                                    localStorage.setItem("username", username);
                                }else{
                                    tools.cookie("username", username, {"expires" : 14 ,"path" : "/"});
                                }
                                if(confirm(res.res_message+",即将跳转至首页")){
                                    window.location = "index.html";
                                }
                            }else{
                                alert(res.res_message);
                            }
                        }
                    })
                })
            }
        }

        new Login();
    })
})