require(["require.config"],() => {
    require(["jquery","url","shopItem","recommend","header","footer","listnav"], ($,url,ShopItem,Recommend) => {
        class List{
            constructor () {
                this.sub();
                this.rec();
                this.priceDesc();
                this.saleMany();
                this.newShop();
                this.popularity();
            }
            // list
            sub () {
                new ShopItem($("#sub-container"), url.baseUrl+"/sub/get");
            }
            // 排序
            // 1、价格排序（升序）
            priceDesc () {
                $("#pariceRise").on("click", function () {
                    // 请求原始数据，然后进行排序，在渲染到页面
                    new Promise(resolve => {
                        $.get(url.baseUrl+"/sub/get", res => {
                            if(res.res_code === 1){
                                resolve(res.res_body.list);
                            }
                        })
                    }).then(list => {
                        // 排序
                        list = list.sort((a,b) => {
                            return a.price-b.price;
                        })
                        new ShopItem($("#sub-container"), "", list);
                    })
                })
            }
            // 2、销量排序（升序）
            saleMany () {
                $("#saleMany").on("click" , function () {
                    new Promise(resolve => {
                        $.get(url.baseUrl+"/sub/get" , res => {
                            if(res.res_code === 1){
                                resolve(res.res_body.list);
                            }
                        })
                    }).then(list => {
                        list = list.sort((a,b) => {
                            return a.salenum-b.salenum;
                        })
                        new ShopItem($("#sub-container"), "", list);
                    })
                })
            }
            // 3、新品排序（以Id排序、为降序）
            newShop () {
                $("#newShop").on("click", function () {
                    new Promise(resolve => {
                        $.get(url.baseUrl+"/sub/get", res => {
                            if(res.res_code === 1){
                                resolve(res.res_body.list);
                            }
                        })
                    }).then(list => {
                        list = list.sort((a,b) => {
                            return b.id-a.id;
                        })
                        new ShopItem($("#sub-container"), "", list);
                    })
                })
            }
            // 4、人气(评价)排序（升序）
            popularity () {
                $("#popularity").on("click" , function () {
                    new Promise(resolve => {
                        $.get(url.baseUrl+"/sub/get", res => {
                            if(res.res_code === 1){
                                resolve(res.res_body.list);
                            }
                        })
                    }).then(list => {
                        list = list.sort((a,b) => {
                            return a.evaluate-b.evaluate;
                        })
                        new ShopItem($("#sub-container"), "", list);
                    })
                })
            }

            // recommend
            rec () {
                new Recommend($("#info-container"), url.baseUrl+"/rec/get");
            }

            // sub () {
            //     $.ajax({
            //         url : url.baseUrl + "/sub/get",
            //         method : "GET",
            //         datatype : "json",
            //         success : function(res){
            //             // console.log(res);
            //             if(res.res_code === 1){
            //                 let list = res.res_body.list;
            //                 var html = template("subList", {list})
            //                 $("#sub-container").html(html);
            //             }
            //         }
            //     })
            // }

            // rec () {
            //     $.ajax({
            //         url : url.baseUrl + "/rec/get",
            //         method : "GET",
            //         datatype : "json",
            //         success : function(res){
            //             // console.log(res);
            //             if(res.res_code === 1){
            //                 let list = res.res_body.list;
            //                 var html = template("recList", {list})
            //                 $("#info-container").html(html);
            //             }
            //         }
            //     })
            // }
        }
        new List();
    })
})