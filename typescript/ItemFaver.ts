/// <reference path="../typings/jquery/jquery.d.ts"/>

class ItemFaver {
    constructor(private $document: JQuery, private workingMode: WorkingMode) {
    }

    toggleFavesOnPage(forceState?: boolean): Promise<boolean[]> {
        let $buttons: JQuery[];

        if (forceState == false) {
            $buttons = this.getFavedButtons();
        } else {
            $buttons = this.getUnfavedButtons();
        }

        return $buttons.reduce((sequence, btn) => {
            // Add these actions to the end of the sequence
            return sequence.then(() => {
                return this.toggleItemFave(btn, forceState);
            });
        }, Promise.resolve());
    }

    toggleItemFave($button: JQuery, isUnfave?: boolean): Promise<boolean> {
        debugger
        return new Promise<boolean>((resolve, reject) => {
            if (isUnfave) {
                $button.click();
                resolve(true);
                return;
            }
            Database.canFaveMoreItems().then((result) => {
                if (result == true) {
                    setTimeout(() => {
                        $button.click();
                        Database.saveFave(new Date()).then(() => {
                            resolve(true);
                        });
                    }, Globals.delayBetweenFaves())
                }
                else {
                    resolve(false);
                }
            });
        });
    }

    getUnfavedButtons(): JQuery[] {
        let place = Utils.whereAreWe();

        switch (this.workingMode) {
            case WorkingMode.ItemsILove:
            case WorkingMode.ItemsForYou:
                return this.$document.find("button.btn-fave").not(".done").get();
            case WorkingMode.TeamFaving:
                return this.$document.find(".button-fave.unfavorited-button").not(".favorited-button").get();
            default:
                return <JQuery[]>[];
        }
    }

    getFavedButtons(): JQuery[] {
        let place = Utils.whereAreWe();

        switch (this.workingMode) {
            case WorkingMode.ItemsILove:
            case WorkingMode.ItemsForYou:
                return this.$document.find("button.btn-fave.done").get();
            case WorkingMode.TeamFaving:
                return this.$document.find(".button-fave.favorited-button").not(".unfavorited-button").get();
            default:
                return <JQuery[]>[];
        }
    }
}
