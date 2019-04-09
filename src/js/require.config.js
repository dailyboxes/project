require.config({
    baseUrl:"/",
    paths : {
        "jquery" : "/libs/jquery/jquery-1.11.3.min",
        "header" : "/js/module/header",
        "footer" : "/js/module/footer",
        "url" : "/js/module/url",
        "template" : "/libs/art-template/template-web",
        "shopItem" : "/js/module/shopItem",
        "recommend" : "/js/module/recommend",
        "listnav" : "/js/module/listnav",
        "aftersale" : "/js/module/aftersale",
        "zoom" : "../libs/jquery-plugins/jquery.elevateZoom-3.0.8.min.js"
    },
    // 垫片，不满足AMD规范的模块，但是依赖于另外的模块
    shim : {
        "zoom" : {
            deps : ["jquery"]
        }
    }
})