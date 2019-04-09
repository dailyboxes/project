define(["jquery"], function($){
    class List {
        constructor () {
            this.init();
        }
        init () {
            return new Promise(resolve => {
                $("#listnav").load("/html/module/listnav.html", () => {
                    resolve();
                })
            })
        }
    }
    return new List();
})