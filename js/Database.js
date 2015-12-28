var Database = (function () {
    function Database() {
    }
    Database.canFaveMoreItems = function () {
        var _this = this;
        var faveCount;
        return new Promise(function (resolve, reject) {
            _this.getFavesTrack().then(function (favesTrack) {
                favesTrack.count = favesTrack.count || 0;
                var lastFaveMoment = favesTrack.dateOfLast;
                var thisFaveMoment = new Date();
                if (!_this.areDatesInSameHour(lastFaveMoment, thisFaveMoment)) {
                    resolve(true);
                }
                else if (favesTrack.count <= Globals.maxFavesPerHour) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    Database.saveFave = function (date) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getFavesTrack().then(function (favesTrack) {
                favesTrack.count = favesTrack.count || 0;
                if (_this.areDatesInSameHour(favesTrack.dateOfLast, date)) {
                    favesTrack.count = favesTrack.count + 1;
                    favesTrack.dateOfLast = date;
                }
                else {
                    favesTrack.count = 1;
                    favesTrack.dateOfLast = date;
                }
                _this.saveFavesTrack(favesTrack).then(function () {
                    resolve();
                });
            });
        });
    };
    Database.canFaveItemsForYou = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.canFaveMoreItems().then(function (result) {
                if (!result) {
                    resolve(false);
                    return;
                }
                else {
                    _this.storage.get("itemsForYou", function (itemsForYou) {
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
                            resolve(true);
                        }
                    });
                }
            });
        });
    };
    Database.areDatesInSameHour = function (d1, d2) {
        var m1 = moment(d1), m2 = moment(d2);
        return m1.isSame(m2, "hour");
    };
    Database.getFavesTrack = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("favesTrack", function (get) {
                if (get.favesTrack) {
                    get.favesTrack = JSON.parse(get.favesTrack);
                }
                else {
                    get.favesTrack = { dateOfLast: new Date(), count: 0 };
                }
                resolve(get.favesTrack);
                return;
            });
        });
    };
    Database.saveFavesTrack = function (favesTrack) {
        var _this = this;
        var save = {};
        save["favesTrack"] = JSON.stringify(favesTrack);
        return new Promise(function (resolve, reject) {
            _this.storage.set(save, function () {
                console.log("[DATABASE]: Fave saved. Fave count set to:", favesTrack.count);
                resolve();
            });
        });
    };
    Database.storage = chrome.storage.local;
    return Database;
})();
