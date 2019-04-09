define(["jquery", "template"], ($, template) => {
    function ShopItem (container, url, listData) {
        this.container = container;
        this.url = url;
        this.listData = listData;
        this.load();
    }
    // jquery提供的合并对象的方法
    $.extend(ShopItem.prototype, {
        load : function () {
            this.container.load("/html/module/shopItem.html", () => {
                // 判断listData是否有数据
                if(this.listData){
                    this.render(this.listData);
                }else{
                    this.getData();
                }
            })
        },
        // 请求列表数据
        getData : function () {
            $.get(this.url, res => {
                if(res.res_code === 1){
                    this.render(res.res_body.list);
                }
            })
        },
        // 用获取的数据渲染列表
        render : function (list) {
            this.container.html(template("subList" , { list : list}));
        }
    });
    return ShopItem;
})