define(["jquery","template"],($, template) => {
    function Recommend (container, url) {
        this.container = container;
        this.url = url;
        this.load();
    }
    // jquery提供的合并对象的方法
    $.extend(Recommend.prototype, {
        load : function () {
            this.container.load("/html/module/recommend.html",() => {
                this.getData();
            })
        },
        // 请求列表数据
        getData : function () {
            $.get(this.url, res => {
                this.render(res);
            })
        },
        // 用获取的数据渲染列表
        render : function (res) {
            this.container.html(template("recList",{list : res.res_body.list}));
        }
    });
    return Recommend;
})