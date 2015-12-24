/// <reference path="../typings/chrome/chrome.d.ts"/>
/// <reference path="../typings/moment/moment.d.ts"/>

declare var globals: any;

interface FavesTrack {
  dateOfLast: Date,
  count: number
}

class Database {
  storage = chrome.storage.local;
  constructor() {
  }

  public canFaveMoreItems() {
    var faveCount: number;
    var that = this;

    var p = new Promise(function(resolve, reject) {
      that.getFavesTrack().then(function(favesTrack: FavesTrack) {
        favesTrack.count = favesTrack.count || 0;
        var lastFaveMoment = favesTrack.dateOfLast;
        var thisFaveMoment = new Date();

        if (!that.areDatesInSameHour(lastFaveMoment, thisFaveMoment)) {
          resolve(true);
        }
        else if (favesTrack.count <= globals.maxFavesPerHour) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      })
    });

    return p;
  }

  public saveFave(date: Date) {
    var that = this;

    return new Promise(function(resolve, reject) {
      this.getFavesTrack.then(function(favesTrack: FavesTrack) {
        favesTrack.count = favesTrack.count || 0;
        if (that.areDatesInSameHour(favesTrack.dateOfLast, date)) {
          favesTrack.count++;
          favesTrack.dateOfLast = date;
        }
        else {
          favesTrack.count = 1;
          favesTrack.dateOfLast = date;
        }
        this.storage.set({ 'favesTrack': favesTrack }, function() {
          console.log("Fave count set to:", favesTrack.count);
          resolve();
        });
      });
    });
  }

  private areDatesInSameHour(d1: Date, d2: Date) {
    var m1 = moment(d1), m2 = moment(d2);
    return m1.isSame(m2, "hour");
  }

  private getFavesTrack() {
    var that = this;
    var p = new Promise(function(resolve, reject) {
      that.storage.get("favesTrack", function(favesTrack: FavesTrack) {
        resolve(favesTrack);
      });
    });
    return p;
  }
}
