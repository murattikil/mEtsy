var Database = (function () {
    function Database() {
        this.storage = chrome.storage.local;
    }
    Database.prototype.canFaveMoreItems = function () {
        var faveCount;
        var that = this;
        var p = new Promise(function (resolve, reject) {
            that.getFavesTrack().then(function (favesTrack) {
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
            });
        });
        return p;
    };
    Database.prototype.saveFave = function (date) {
        var that = this;
        return new Promise(function (resolve, reject) {
            this.getFavesTrack.then(function (favesTrack) {
                favesTrack.count = favesTrack.count || 0;
                if (that.areDatesInSameHour(favesTrack.dateOfLast, date)) {
                    favesTrack.count++;
                    favesTrack.dateOfLast = date;
                }
                else {
                    favesTrack.count = 1;
                    favesTrack.dateOfLast = date;
                }
                this.storage.set({ 'favesTrack': favesTrack }, function () {
                    console.log("Fave count set to:", favesTrack.count);
                    resolve();
                });
            });
        });
    };
    Database.prototype.areDatesInSameHour = function (d1, d2) {
        var m1 = moment(d1), m2 = moment(d2);
        return m1.isSame(m2, "hour");
    };
    Database.prototype.getFavesTrack = function () {
        var that = this;
        var p = new Promise(function (resolve, reject) {
            that.storage.get("favesTrack", function (favesTrack) {
                resolve(favesTrack);
            });
        });
        return p;
    };
    return Database;
})();
