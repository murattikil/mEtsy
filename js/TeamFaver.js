var TeamFaver = (function () {
    function TeamFaver() {
        console.log("[TeamFaver]: New Team object created.");
    }
    TeamFaver.prototype.start = function () {
        var doc = $(document);
        this.itemFaver = new ItemFaver($(document), WorkingMode.TeamFaving);
        this.doFaving();
    };
    TeamFaver.prototype.doFaving = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.itemFaver.toggleFavesOnPage(true).then(function (result) {
                var allPassed = _this.itemFaver.successItems.every(function (item) {
                    return item;
                });
                console.log("[TeamFaver]: Faving page finished. All passed?", allPassed);
                if (allPassed && _this.goNextPage()) {
                    console.log("[TeamFaver]: Going to the next page.");
                }
            });
        });
    };
    TeamFaver.prototype.goNextPage = function () {
        var $current = $(".pager .pages a.current-page");
        var $next = $current.parent().next().find("a");
        if ($next.length > 0) {
            window.location.href = $next.attr("href");
            return true;
        }
        else {
            return false;
        }
    };
    return TeamFaver;
})();
