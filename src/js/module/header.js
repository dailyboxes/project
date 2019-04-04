define(["jquery"], function($) {
    class Header {
        constructor () {
            this.init().then(() => {
                this.search();
                this.login();
            });
        }
        init () {
            return new Promise(resolve => {
                $("#header-container").load("/html/module/header.html", () => {
                    resolve();
                })
            })
        }
        search () {
            this.search = $("#search");
            this.searchContainer = $("#searchContainer");
            let _this = this;
            this.search.on("keyup", function () {
                // 获取输入框的值，并取消前后空格
                let keyWord = $(this).val().trim();
                // 判断输入框的值不能为空
                if(keyWord !== ""){
                    $.getJSON("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd="+keyWord, res => {
                        let list = res.s;
                        let ul =$("<ul>");
                        list.forEach(function (item,index) {
                            $("<li>").html(item).appendTo(ul);
                        });
                        _this.searchContainer.empty().show().append(ul);
                    })
                }else{
                    // 隐藏上一次的请求
                    _this.searchContainer.hide();
                }
            })
            this.search.on("blur", function () {
                setTimeout(() => {
                    _this.searchContainer.hide();
                },200);
            })
            this.searchContainer.on("click", "li", function (e) {
                _this.search.val($(this).html());
                _this.searchContainer.hide();
            })
        }
        login () {
            $(".searchUl").css("position","absolute");
            $(".searchUl").css("z-index","9");
            $(".searchUl").css("cursor","pointer");
            $(".searchUl").css("background","#dfdfdf");
            $(".searchUl").css("width","433px");
        }
    }

    return new Header();
    
});