require(["require.config"], () => {
    require(["jquery", "template","header","footer"], ($,template) => {
        function Cart () {
            this.init();
        }
        
        $.extend(Cart.prototype, {
            init () {
                this.cart = JSON.parse(localStorage.getItem("cart"));
                this.n = 0;
                this.render();
                this.choice();
                this.del();
                this.allDel();
                this.cartAdd();
                this.cartRud();
                
                // this.allMoney();
            },
            render () {
                var html = template("cart-tbody", {cart: this.cart});
                // console.log(html);
                $(".shop-num").val($(".shop-cart-num").val());
                $("#cart-tbody-container").html(html);
            },

            choice () {
                // 全选
                $(".allCheck").click (() => {
                    
                    // prop 获取匹配的元素集中第一个元素的属性值或设置每一个匹配元素的一个或多个属性。
                    if($(".allCheck").prop("checked")) {
                        $(".aCheck").prop("checked", true);
                    }
                    this.n = $(".allCheck").prop("checked") ? $(".aCheck").length : 0;
                    this.allMoney();
                    this.shopNum();
                })
                // 单选
                
                $(".aCheck").click (() => {
                    // each 迭代(遍历)
                    $(".aCheck").each((index, aCheck) => {
                        if(aCheck.checked){
                            this.n++;
                        }
                    })
                    if(this.n != $(".aCheck").length) {
                        // get 取得所有匹配的 DOM 元素集合
                        $(".allCheck").get(0).checked = false;
                    }else{
                        $(".allCheck").get(0).checked = true;
                    }
                    this.allMoney();
                })
            
            },

            // 总价
            allMoney () {
                var allmoney = 0;
                $(".aCheck").each((index, aCheck) => {  
                    if(aCheck.checked) {
                        allmoney += Number($(aCheck).parent().parent().children(".allPrice").children(".allprice").html());
                    }
                    
                })
                $("#allmoney").html(allmoney);
            },

            // 删除
            del () {
                $(".delete").on("click", function() {
                    
                    if(confirm("确定不买这件商品吗？")) {
                        
                        $(this).parent().remove();
                        
                    }
                })
            },

            // 清空购物车
            allDel () {
                $("#all-del").on("click", function () {
                    if(confirm("确定需要清空购物车")){
                        // 移除所有的localstorage
                        localStorage.removeItem("cart");
                        $(".cart-tr").remove();
                    }
                })
            },

            // 添加数量
            cartAdd () {
                $("#cartadd").on("click", function () {
                    var n = $(".shop-cart-num").val();
                    n++;
                    $(".shop-cart-num").val(n);
                })
            },

            // 减少数量
            cartRud () {
                $("#cartrud").on("click", function () {
                    var m = $(".shop-cart-num").val();
                    if (--m <= 1) {
                        m = 1;
                    }
                    $(".shop-cart-num").val(m);
                })
            }
            
            
            
        })
        new Cart();
    })
})