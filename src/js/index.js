require(["require.config"],function () {
    require(["jquery","header","url","template","footer"],function ($ , header, url, template){
        class Index{
            constructor () {
                this.lunbo();
                this.hot();
                this.new();
                this.discount();
            }
            // lunbo
            lunbo () {
                var $lunboGo =$(".lunbo-go") ,
                    // lunbo = document.querySelector(".lunbo"),
                    $ul = $lunboGo.children("ul"),
                    $imgs = $ul.children(),
                    $ol = $lunboGo.children("ol"),
                    index = 0,
                    lastIndex = 0,
                    btns = [];
                
                for(var i = 0; i < $imgs.length;i++){
                    btns.push($("<li>").html(i+1).addClass(i===0 ? "ac" : "").appendTo($ol));
                };

                btns = Array.from(btns);
                btns.forEach(function(btn){
                    btn.on("mouseenter",function(){
                        index = this.innerText - 1;
                        change();
                    })
                });

                function change () {
                    btns[index].addClass("ac").siblings().removeClass("ac");
                    $imgs[index].classList.add("ac");
                    $imgs[lastIndex].classList.remove("ac");
                    lastIndex = index;
                };

                // var timer = setInterval(function(){
                //     if(++index >= $imgs.length) index = 0;
                //     change();
                // },4000);
                // lunbo.onmouseover = function(){
                //     clearInterval(timer);
                // }
                // lunbo.onmouseout = function(){
                //     timer = setInterval(function(){
                //         if(++index >= $imgs.length) index = 0;
                //         change();
                //     },4000)
                // }

                $lunboGo.hover(function () {
                    clearInterval($lunboGo.timer)
                },(function autoPlay(){
                    $lunboGo.timer = setInterval(function (){
                        if(++index >= $imgs.length) index = 0;
                        change();
                    },5000);
                    return autoPlay;
                })());
            }

            hot () {
                $.ajax({
                    url : url.baseUrl + "/hot/get",
                    method : "GET",
                    dataType : "json",
                    success :function(res){
                        // console.log(res);
                        if(res.res_code === 1) {
                            let list = res.res_body.list;
                            var html = template("hotList" , { list });
                            // console.log(html);
                            $("#hotListContainer").html(html);
                        }
                    }
                })
            }

            new () {
                $.ajax({
                    url : url.baseUrl + "/new/get",
                    method : "GET",
                    dataType : "json",
                    success : function (res) {
                        // console.log(res);
                        if(res.res_code === 1){
                            let list = res.res_body.list;
                            var html = template("newList", { list });
                            $("#newListContainer").html(html);
                        }
                    }
                })
            }

            discount () {
                $.ajax({
                    url : url.baseUrl + "/discount/get",
                    method : "GET",
                    dataType : "json",
                    success : function (res) {
                        // console.log(res);
                        if(res.res_code === 1){
                            let list = res.res_body.list;
                            var html = template("discountList", { list });
                            $("#discountListContainer").html(html);
                        }
                    }
                })
            }
        }
        new Index();
    })
})