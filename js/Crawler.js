var Crawler = (function () {
    function Crawler() {
        this.globals = new Globals();
        this.helpers = new Helpers();
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
        var p = new Promise(function (resolve, reject) {
            this.faveAllOnThisPage(resolve);
        });
        p.then(function () {
            var nextPage = this.getNextPage();
            if (nextPage > 0) {
                this.helpers.gotoUrl(this.globals.urlTemplate.itemsForYou({ username: this.helpers.getUserFromPageUrl(), page: nextPage }));
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
        var $buttons = $("button.btn-fave").not(".done");
        var p = new Promise(function (resolve, reject) {
            this.faveItems($buttons, 0, resolve);
        });
        p.then(function () {
            resolve();
        });
    };
    Crawler.prototype.faveItems = function ($buttons, index, resolve) {
        if (index < $buttons.length) {
            $buttons[index].click();
            setTimeout(function () {
                this.faveItems($buttons, index + 1);
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
