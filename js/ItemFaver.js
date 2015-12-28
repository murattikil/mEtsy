var ItemFaver = (function () {
    function ItemFaver($document, workingMode) {
        this.$document = $document;
        this.workingMode = workingMode;
    }
    ItemFaver.prototype.toggleFavesOnPage = function (forceState) {
        var _this = this;
        var $buttons;
        if (forceState == false) {
            $buttons = this.getFavedButtons();
        }
        else {
            $buttons = this.getUnfavedButtons();
        }
        return $buttons.reduce(function (sequence, btn) {
            return sequence.then(function () {
                return _this.toggleItemFave(btn, forceState);
            });
        }, Promise.resolve());
    };
    ItemFaver.prototype.toggleItemFave = function ($button, isUnfave) {
        debugger;
        return new Promise(function (resolve, reject) {
            if (isUnfave) {
                $button.click();
                resolve(true);
                return;
            }
            Database.canFaveMoreItems().then(function (result) {
                if (result == true) {
                    setTimeout(function () {
                        $button.click();
                        Database.saveFave(new Date()).then(function () {
                            resolve(true);
                        });
                    }, Globals.delayBetweenFaves());
                }
                else {
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
