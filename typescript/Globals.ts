/// <reference path="../typings/lodash/lodash.d.ts"/>
/// <reference path="../typings/mustache/mustache.d.ts"/>

// using custom template delimiters
class Globals {
  static enableCrawler = true;
  static online = true; //actually do faving, liking, friending
  static username = "Grangzor";
  static startFromAnywhere = false;
  static delayAfterPageLoad: number = 20000; //wait for fave buttons.done to initialize after page load
  static maxFavesPerHour: number = 300;
  static minDelayBetweenFaves: number = 2300;
  static maxDelayBetweenFaves: number = 2700;
  static decideCrawlingModeInterval = 15000;

  static urlTemplate = {
    favorites: "https://www.etsy.com/people/{{ username }}/favorites?ref=hdr",
    itemsForYou: "https://www.etsy.com/people/{{ username }}/favorites/items-for-you?page={{ page }}",
    itemsILove: "https://www.etsy.com/people/{{ username }}/favorites/items-i-love?page={{ page }}",
  };

  static url = {
    itemsForYouUrl: Mustache.render(Globals.urlTemplate.itemsForYou, { username: Globals.username, page: 1 }),
    itemsILoveUrl: Mustache.render(Globals.urlTemplate.itemsILove, { username: Globals.username, page: 1 }),
  };

  constructor() {
  }

  static delayBetweenFaves() {
    return Utils.randomIntFromInterval(Globals.minDelayBetweenFaves, Globals.maxDelayBetweenFaves);
  }
}
console.log("[Globals]: Loaded Globals");
