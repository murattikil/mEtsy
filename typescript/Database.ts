/// <reference path="../typings/chrome/chrome.d.ts"/>
/// <reference path="../typings/moment/moment.d.ts"/>

class Database {
  storage = chrome.storage.local;
  constructor() {

  }

  public saveFave(user, resolve) {
    var faveCount: number;

    this.storage.get("lastFaveDate", function(lastFaveDate) {
      var lastFaveMoment = moment(lastFaveDate);
      var thisFaveMoment = moment();

      var h = thisFaveMoment.diff(lastFaveMoment, "hours");
      if (h > 0 || thisFaveMoment.hour() != lastFaveMoment.hour()) {
        faveCount = 1;
      }

      this.storage.set({ 'lastFaveDate': thisFaveMoment.toDate() }, function() {
        this.setFaveCount(faveCount, resolve);
      });
    });
  }

  private setFaveCount(count, resolve) {
    this.storage.set({ "faveCount": count }, function() {
      console.log("Fave count set to:", count);
      resolve();
    });
  }
}
