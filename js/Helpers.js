var Helpers = (function () {
    function Helpers() {
        this.globals = new Globals();
    }
    Helpers.prototype.gotoUrl = function (url) {
        window.location.href = url;
    };
    Helpers.prototype.getUserFromPageUrl = function () {
        var re = /[^\/]+\/([^\/]+)/;
        var user = window.location.pathname.match(re)[1];
        return user;
    };
    return Helpers;
})();
