require(["require.config"],() => {
    require(["jquery","header","url","template","footer"], ($,header,url,template) => {
        class List{
            constructor () {
                this.sub();
                this.rec();
            }
            sub () {
                $.ajax({
                    url : url.baseUrl + "/sub/get",
                    method : "GET",
                    datatype : "json",
                    success : function(res){
                        // console.log(res);
                        if(res.res_code === 1){
                            let list = res.res_body.list;
                            var html = template("subList", {list})
                            $("#sub-container").html(html);
                        }
                    }
                })
            }

            rec () {
                $.ajax({
                    url : url.baseUrl + "/rec/get",
                    method : "GET",
                    datatype : "json",
                    success : function(res){
                        // console.log(res);
                        if(res.res_code === 1){
                            let list = res.res_body.list;
                            var html = template("recList", {list})
                            $("#info-container").html(html);
                        }
                    }
                })
            }
        }
        new List();
    })
})