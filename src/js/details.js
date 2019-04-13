require(["require.config"], () => {
    require(["jquery", "url", "template", "fly", "header", "footer","listnav","aftersale","zoom"], ($,url,template) => {
        class Details {
            constructor () {
                this.init();
            }
            init () {
                // 获取Id
                let id = location.search.slice(4);
                // 获取数据
                $.ajax({
                    url: url.baseUrl+"details/get?id="+id,
                    method: "GET",
                    dataType: "json",
                    success: res=>{
                        if(res.res_code ===1){
                            // 当前商品数据
                            this.details = res.res_body.details;
                            // 修改id，因为rap2返回的id都是一样的
                            this.details.id = id;
                            this.render(res.res_body.details);
                            this.add();
                            this.reDuce();
                        }
                    }
                })
            }
            render (details) {
                // console.log(details);
                var html = template("details-list", {...details});
                // console.log(html);
                $("#details-container").html(html);
                this.zoom();
                this.addToCart();
                this.btn1();
                // this.numAnd();
            }
            
            zoom () {
                // 放大镜插件
                // console.log($(".zoom-img"))
                $(".zoom-img").elevateZoom({
                    gallery:'gal1',
                    cursor: 'pointer',
                    galleryActiveClass: 'active',
                    borderSize:'1',    
                    borderColor:'#888'
                });
            }
            // 立即购买
            btn1 () {
                $(".btn1").on("click" , () => {
                    let cart = localStorage.getItem("cart");
                    if(cart){
                        cart = JSON.parse(cart);
                        let index;
                        if(cart.some((item, i) => {
                            index = i;
                            return item.id == this.details.id;
                        })){
                            // 索引为index的这条数据就是当前数据
                            cart[index].num++;
                        }else{
                            cart.push({...this.details, num : $(".num-input").val()});
                        }
                        
                        localStorage.setItem("cart", JSON.stringify(cart))
                    }else{
                        localStorage.setItem("cart", JSON.stringify([
                            {...this.details, num : $(".num-input").val()}
                        ]))
                    }
                    location.href = "../cart.html";
                })
            }
            // 添加购物车
            addToCart () {
                $(".btn2").on("click", (e) => {
                    // 存数据之前先取
                    let cart = localStorage.getItem("cart");
                    if(cart){
                        cart = JSON.parse(cart);
                        let index;
                        if(cart.some((item, i) => {
                            index = i;
                            return item.id == this.details.id;
                        })){
                            // 索引为index的这条数据就是当前数据
                            cart[index].num++;
                        }else{
                            cart.push({...this.details, num : $(".num-input").val()});
                        }
                        
                        localStorage.setItem("cart", JSON.stringify(cart))
                    }else{
                        localStorage.setItem("cart", JSON.stringify([
                            {...this.details, num : $(".num-input").val()}
                        ]))
                    }
                    // console.log(JSON.parse(localStorage.getItem("cart")));
                    $("<div style='width : 30px; height : 30px;'><img style='width : 30px; height : 30px;' src = '../img/cartp.png'></div>").fly({
                        start : {
                                left : e.clientX,  //开始位置（必填）#fly元素会被设置成position: fixed
                                top : e.clientY,  //开始位置（必填）
                            },
                          end : {
                                left : $(window).innerWidth()-50, //结束位置（必填）
                                top : $(".shopping").position().top+7 ,  //结束位置（必填）
                                width : 100,
                                height : 100,
                            },
                                autoPlay: true, //是否直接运动,默认true
                                speed: 1.2, //越大越快，默认1.2
                                vertex_Rtop: 20, //运动轨迹最高点top值，默认20
                                onEnd: function(){
                                    this.destroy(); // 销毁小方块
                                    $(".shop-num").html(Number($(".shop-num").html())+1);
                            } //结束回调
                    })
                })

                
            }
            // 增加数量
            add () {
                $(".num-add").on("click", function () {
                    var n = $(this).parent().children(".num-input").val();
                    n++;
                    $(this).parent().children(".num-input").val(n);
                })
            }
            // 减少数量
            reDuce () {
                $(".num-sub").on("click", function () {
                    var m = $(this).parent().children(".num-input").val();
                    if(--m <= 1) m = 1;
                    $(this).parent().children(".num-input").val(m);
                })
            }
        }
        new Details();
    })
})