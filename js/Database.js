var Database = (function () {
    function Database() {
        this.storage = chrome.storage.local;
    }
    Database.prototype.saveFave = function (user, resolve) {
        var faveCount;
        this.storage.get("lastFaveDate", function (lastFaveDate) {
            var lastFaveMoment = moment(lastFaveDate);
            var thisFaveMoment = moment();
            var h = thisFaveMoment.diff(lastFaveMoment, "hours");
            if (h > 0 || thisFaveMoment.hour() != lastFaveMoment.hour()) {
                faveCount = 1;
            }
            this.storage.set({ 'lastFaveDate': thisFaveMoment.toDate() }, function () {
                this.setFaveCount(faveCount, resolve);
            });
        });
    };
    Database.prototype.setFaveCount = function (count, resolve) {
        this.storage.set({ "faveCount": count }, function () {
            console.log("Fave count set to:", count);
            resolve();
        });
    };
    return Database;
})();
