var ItemFaver = (function () {
    function ItemFaver($document, workingMode) {
        this.$document = $document;
        this.workingMode = workingMode;
        this.successItems = [];
    }
    ItemFaver.prototype.toggleFavesOnPage = function (forceState) {
        var _this = this;
        this.successItems.length = 0;
        var $buttons;
        if (forceState == true) {
            $buttons = this.getUnfavedButtons();
        }
        else {
            $buttons = this.getFavedButtons();
        }
        console.log("[ItemFaver]: Found", $buttons.length, "items to click on.");
        return $buttons.reduce(function (sequence, btn) {
            return sequence.then(function () {
                return _this.toggleItemFave(btn, forceState);
            });
        }, Promise.resolve());
    };
    ItemFaver.prototype.toggleItemFave = function ($button, state) {
        var _this = this;
        if (state) {
            state = true;
        }
        else {
            state = false;
        }
        console.log("[ItemFaver]", moment().format("HH:mm:ss"), "Toggling item fave state to", state);
        return new Promise(function (resolve, reject) {
            if (!state) {
                $button.click();
                _this.successItems.push(true);
                resolve(true);
                return;
            }
            Database.canFaveMoreItems().then(function (result) {
                if (result == true) {
                    setTimeout(function () {
                        $button.click();
                        Database.saveFave(new Date()).then(function () {
                            _this.successItems.push(true);
                            resolve(true);
                        });
                    }, Globals.delayBetweenFaves());
                }
                else {
                    _this.successItems.push(false);
                    resolve(false);
                }
            });
        });
    };
    ItemFaver.prototype.getUnfavedButtons = function () {
        var place = Utils.whereAreWe();
        switch (this.workingMode) {
            case WorkingMode.ItemsILove:
            case WorkingMode.ItemsForYou:
                return this.$document.find("button.btn-fave").not(".done").get();
            case WorkingMode.TeamFaving:
                return this.$document.find(".button-fave.unfavorited-button").not(".favorited-button").get();
            default:
                return [];
        }
    };
    ItemFaver.prototype.getFavedButtons = function () {
        var place = Utils.whereAreWe();
        switch (this.workingMode) {
            case WorkingMode.ItemsILove:
            case WorkingMode.ItemsForYou:
                return this.$document.find("button.btn-fave.done").get();
            case WorkingMode.TeamFaving:
                return this.$document.find(".button-fave.favorited-button").not(".unfavorited-button").get();
            default:
                return [];
        }
    };
    return ItemFaver;
})();
