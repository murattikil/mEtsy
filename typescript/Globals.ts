/// <reference path="../typings/lodash/lodash.d.ts"/>

// using custom template delimiters
// _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

class Globals {
  //settings
  enableCrawler = true;
  online = true; //actually do faving, liking, friending
  username = "Grangzor";
  startFromAnywhere = false;

  urlTemplate = {
    favorites: _.template("https://www.etsy.com/people/{{ username }}/favorites?ref=hdr"),
    itemsForYou: _.template("https://www.etsy.com/people/{{ username }}/favorites/items-for-you?page={{ page }}"),
    itemsILove: _.template("https://www.etsy.com/people/{{ username }}/favorites/items-i-love?page={{ page }}"),
  };

  url = {
    itemsForYouUrl: this.urlTemplate.itemsForYou({ username: this.username, page: 1 }),
    itemsILoveUrl: this.urlTemplate.itemsILove({ username: this.username, page: 1 }),
  };

  constructor() {
  }

  demo() {
    return 2;

  }
}
console.log("Loaded Globals");
