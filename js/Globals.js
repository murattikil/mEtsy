var Globals = (function () {
    function Globals() {
    }
    Globals.delayBetweenFaves = function () {
        return Utils.randomIntFromInterval(Globals.minDelayBetweenFaves, Globals.maxDelayBetweenFaves);
    };
    Globals.enableCrawler = true;
    Globals.online = true;
    Globals.username = "Grangzor";
    Globals.startFromAnywhere = false;
    Globals.delayAfterPageLoad = 3000;
    Globals.maxFavesPerHour = 300;
    Globals.minDelayBetweenFaves = 2300;
    Globals.maxDelayBetweenFaves = 2700;
    Globals.decideCrawlingModeInterval = 15000;
    Globals.urlTemplate = {
        favorites: "https://www.etsy.com/people/{{ username }}/favorites?ref=hdr",
        itemsForYou: "https://www.etsy.com/people/{{ username }}/favorites/items-for-you?page={{ page }}",
        itemsILove: "https://www.etsy.com/people/{{ username }}/favorites/items-i-love?page={{ page }}",
    };
    Globals.url = {
        itemsForYouUrl: Mustache.render(Globals.urlTemplate.itemsForYou, { username: Globals.username, page: 1 }),
        itemsILoveUrl: Mustache.render(Globals.urlTemplate.itemsILove, { username: Globals.username, page: 1 }),
    };
    return Globals;
})();
console.log("[Globals]: Loaded Globals");
