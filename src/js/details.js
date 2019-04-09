require(["require.config"], () => {
    require(["jquery", "url", "template", "header", "footer","listnav","aftersale"], ($,url,template) => {
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
                        }
                    }
                })
            }
            render (details) {
                console.log(details);
                var html = template("details-list", {...details});
                // console.log(html);
                $("#details-container").html(html);
            }

        }
        new Details();
    })
})