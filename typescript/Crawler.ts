/// <reference path="../typings/jquery/jquery.d.ts"/>

declare var globals: any;

class Crawler {
  test: string;
  helpers: Helpers;
  that: Crawler;
  db: Database;
  constructor() {
    this.helpers = new Helpers();
    this.that = this;
    this.db = new Database();
  }

  start() {
    if (globals.enableCrawler != true) {
      console.log("[CRAWLER]: Not enabled.")
      return;
    };

    console.log("[CRAWLER]: I'm starting!");
    if (this.whereAreWe() == "not implemented") {
      if ((globals as any).startFromAnywhere == true){
        this.helpers.gotoUrl(globals.url.itemsForYouUrl);
      }
      else{
        console.log("[CRAWLER]: No rules implemented for this page.");
      }
    }
    if (this.whereAreWe() == "items for you") {
      this.faveItemsForYou();
    }
    if (this.whereAreWe() == "items i like") {
      var user = this.helpers.getUserFromPageUrl();
      if (user != globals.username) {
        this.faveItemsForYou();
      }
    }
  }

  private faveItemsForYou() {
    var that: Crawler = this;
    var p = new Promise(function(resolve, reject) {
      setTimeout(function() {
        that.faveAllOnThisPage(resolve);
      }, globals.delayAfterPageLoad);
    });

    p.then(function() {
      var nextPage = that.getNextPage();
      if (nextPage > 0) {
        that.helpers.gotoUrl(globals.urlTemplate.itemsForYou({ username: that.helpers.getUserFromPageUrl(), page: nextPage }));
      }
    });
  }

  getNextPage() {
    var $pages = $("ul.pages li");
    if ($pages.length == 0) {
      console.debug("[CRAWLER]: There is no pages list on this page.");
      return -1;
    }
    //there is pages list
    var next = $("ul.pages li.active").next("li");
    if (next.length < 1) {
      console.log("[CRAWLER]: There are no more pages to go to.");
      //TODO: Start another type of crawling.
      return 0;
    } else return parseInt(next.text());
  }

  faveAllOnThisPage(resolve) {
    var that: Crawler = this;
    var $buttons = $("button.btn-fave").not(".done");
    console.log("[CRAWLER]: Found ", $buttons.length, " not faved items on this page. Starting to fav them.");
    var p = new Promise(
      function(resolve, reject) {
        that.faveItems($buttons, 0, resolve);
      });
    p.then(function() {
      resolve();
    });
  }

  faveItems($buttons, index, resolve) {
    console.log("[CRAWLER]:", moment().format("HH:mm:ss"), ": Faving item with index:", index);
    var that: Crawler = this;
    if (index < $buttons.length) {
      that.db.canFaveMoreItems().then(function(answer: boolean) {
        if (answer == false) {
          resolve(index);
          return;
        }
        $buttons[index].click();
        setTimeout(function() {
          that.faveItems($buttons, index + 1, resolve);
        }, 2000);
      });
    }
    else {
      resolve(index);
    }
  }

  whereAreWe() {
    if (window.location.pathname.indexOf("/favorites/items-for-you") > 0) {
      return "items for you";
    }
    else if (window.location.pathname.indexOf("/favorites/items-i-love") > 0) {
      //example: https://www.etsy.com/people/apocketofposies/favorites/items-i-love
      //someone's favorites
      //Items I Love is the default list of faves. User can add more lists like this.
      return "items i love";
    }
    else {
      //not implemented
      return "not implemented";
    }
  }
}
