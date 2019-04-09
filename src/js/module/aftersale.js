define(["jquery"], function($){
    class List {
        constructor () {
            this.init();
        }
        init () {
            return new Promise(resolve => {
                $("#aftersale").load("/html/module/aftersale.html", () => {
                    resolve();
                })
            })
        }
    }
    return new List();
})