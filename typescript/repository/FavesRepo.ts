class FavesRepo {
  private storage: chrome.storage.LocalStorageArea = chrome.storage.local;

  constructor() {
  }

  canFaveMoreItems(): Promise<boolean> {
    var faveCount: number;
    return new Promise<boolean>((resolve, reject) => {
      this.getFavesTrack().then((favesTrack: IFavesTrack) => {
        favesTrack.count = favesTrack.count || 0;
        var lastFaveMoment = favesTrack.dateOfLast;
        var thisFaveMoment = new Date();

        if (!this.areDatesInSameHour(lastFaveMoment, thisFaveMoment)) {
          resolve(true);
        }
        else if (favesTrack.count <= Globals.maxFavesPerHour) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      })
    });
  }

  saveFave(date: Date): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.getFavesTrack().then((favesTrack: IFavesTrack) => {
        favesTrack.count = favesTrack.count || 0;
        if (this.areDatesInSameHour(favesTrack.dateOfLast, date)) {
          favesTrack.count = favesTrack.count + 1;
          favesTrack.dateOfLast = date;
        }
        else {
          favesTrack.count = 1;
          favesTrack.dateOfLast = date;
        }
        // favesTrack.favesTrack = null;
        this.saveFavesTrack(favesTrack).then(() => {
          resolve();
        })
      });
    });
  }

  canFaveItemsForYou(): Promise<boolean> {
    //if last faving has been a day ago, return true
    return new Promise<boolean>((resolve, reject) => {
      this.canFaveMoreItems().then((result) => {
        if (!result) {
          resolve(false);
          return;
        }
        else {
          this.storage.get("itemsForYou", (itemsForYou: IItemsForYou) => {
            if (itemsForYou.lastFaved) {
              var now = moment();
              var then = moment(itemsForYou.lastFaved);
              if (now.diff(then, "hours") >= 24) {
                console.log("[DATABASE]: Can't fave items for you because I already faved them less than 24 ago.");
                resolve(false);
              }
              else {
                resolve(true);
              }
            }
            else {
              //frist time faving items for you since installing extension
              resolve(true);
            }
          });
        }
      })
    });
  }

  getFavesCountThisHour(): Promise<number> {
    return this.getFavesTrack().then((favesTrack) => {
      let then = moment(favesTrack.dateOfLast);
      let now = moment();
      if (then.isSame(now, "hour")) {
        return favesTrack.count;
      }
      else {
        return 0;
      }
    })
  }

  private areDatesInSameHour(d1: Date, d2: Date): boolean {
    var m1 = moment(d1), m2 = moment(d2);
    return m1.isSame(m2, "hour");
  }

  private getFavesTrack(): Promise<IFavesTrack> {
    return new Promise<IFavesTrack>((resolve, reject) => {
      this.storage.get("favesTrack", (get: any) => {
        if (get.favesTrack) {
          get.favesTrack = JSON.parse(get.favesTrack);
        }
        else {
          get.favesTrack = <IFavesTrack>{ dateOfLast: new Date(), count: 0 };
        }
        resolve(get.favesTrack);
        return;
      });
    });
  }

  private saveFavesTrack(favesTrack: IFavesTrack): Promise<void> {
    let save = {};
    save["favesTrack"] = JSON.stringify(favesTrack);
    return new Promise<void>((resolve, reject) => {
      this.storage.set(save, () => {
        console.log("[DATABASE]: Fave saved. Fave count set to:", favesTrack.count);
        resolve();
      });
    });
  }
}
