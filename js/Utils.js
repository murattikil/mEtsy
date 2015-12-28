var Utils = (function () {
    function Utils(globals) {
        this.globals = globals;
    }
    Utils.gotoUrl = function (url) {
        window.location.href = url;
    };
    Utils.getUserFromPageUrl = function () {
        var re = /[^\/]+\/([^\/]+)/;
        var user = window.location.pathname.match(re)[1];
        return user;
    };
    Utils.whereAreWe = function (url) {
        url = url || window.location.href;
        if (url.indexOf("/favorites/items-for-you") > 0) {
            return "items-for-you";
        }
        else if (url.indexOf("/favorites/items-i-love") > 0) {
            return "items-i-love";
        }
        else if (url.indexOf("/teams/") > 0) {
            return "teams";
        }
        else {
            return "not implemented";
        }
    };
    Utils.randomIntFromInterval = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    Utils.serializeDate = function () {
    };
    Utils.deserializeDate = function () {
    };
    return Utils;
})();
