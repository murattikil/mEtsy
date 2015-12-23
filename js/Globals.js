_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
var Globals = (function () {
    function Globals() {
        this.enableCrawler = true;
        this.online = true;
        this.username = "Grangzor";
        this.startFromAnywhere = false;
        this.delayAfterPageLoad = 3000;
        this.urlTemplate = {
            favorites: _.template("https://www.etsy.com/people/{{ username }}/favorites?ref=hdr"),
            itemsForYou: _.template("https://www.etsy.com/people/{{ username }}/favorites/items-for-you?page={{ page }}"),
            itemsILove: _.template("https://www.etsy.com/people/{{ username }}/favorites/items-i-love?page={{ page }}"),
        };
        this.url = {
            itemsForYouUrl: this.urlTemplate.itemsForYou({ username: this.username, page: 1 }),
            itemsILoveUrl: this.urlTemplate.itemsILove({ username: this.username, page: 1 }),
        };
    }
    Globals.prototype.demo = function () {
        return 2;
    };
    return Globals;
})();
console.log("Loaded Globals");
