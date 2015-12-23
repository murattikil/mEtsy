var Crawler = (function () {
    function Crawler() {
        this.globals = new Globals();
        this.helpers = new Helpers();
        this.that = this;
    }
    Crawler.prototype.start = function () {
        if (this.globals.enableCrawler != true) {
            console.log("CRAWLER: Not enabled.");
            return;
        }
        ;
        console.log("CRAWLER: I'm starting!");
        if (this.whereAreWe() == "not implemented") {
            if (this.globals.startFromAnywhere == true)
                this.helpers.gotoUrl(this.globals.url.itemsForYouUrl);
        }
        if (this.whereAreWe() == "items for you") {
            this.faveItemsForYou();
        }
        if (this.whereAreWe() == "items i like") {
            var user = this.helpers.getUserFromPageUrl();
            if (user != this.globals.username) {
                this.faveItemsForYou();
            }
        }
    };
    Crawler.prototype.faveItemsForYou = function () {
        var that = this;
        var p = new Promise(function (resolve, reject) {
            setTimeout(function () {
                that.faveAllOnThisPage(resolve);
            }, that.globals.delayAfterPageLoad);
        });
        p.then(function () {
            var nextPage = that.getNextPage();
            if (nextPage > 0) {
                that.helpers.gotoUrl(that.globals.urlTemplate.itemsForYou({ username: that.helpers.getUserFromPageUrl(), page: nextPage }));
            }
        });
    };
    Crawler.prototype.getNextPage = function () {
        debugger;
        var $pages = $("ul.pages li");
        if ($pages.length == 0) {
            console.debug("CRAWLER: There is no pages list on this page.");
            return -1;
        }
        var next = $("ul.pages li.active").next("li");
        if (next.length < 1) {
            console.log("CRAWLER: There are no more pages to go to.");
            return 0;
        }
        else
            return parseInt(next.text());
    };
    Crawler.prototype.faveAllOnThisPage = function (resolve) {
        var that = this;
        var $buttons = $("button.btn-fave").not(".done");
        console.log("CRAWLER: Found ", $buttons.length, " not faved items on this page. Starting to fav them.");
        var p = new Promise(function (resolve, reject) {
            that.faveItems($buttons, 0, resolve);
        });
        p.then(function () {
            resolve();
        });
    };
    Crawler.prototype.faveItems = function ($buttons, index, resolve) {
        var that = this;
        if (index < $buttons.length) {
            $buttons[index].click();
            setTimeout(function () {
                that.faveItems($buttons, index + 1, resolve);
            }, 2000);
        }
        else {
            resolve(index);
        }
    };
    Crawler.prototype.whereAreWe = function () {
        if (window.location.pathname.indexOf("/favorites/items-for-you") > 0) {
            return "items for you";
        }
        else if (window.location.pathname.indexOf("/favorites/items-i-love") > 0) {
            return "items i love";
        }
        else {
            return "not implemented";
        }
    };
    return Crawler;
})();
