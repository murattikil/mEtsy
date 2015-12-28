/// <reference path="../typings/jquery/jquery.d.ts"/>

class ItemFaver {
  successItems: boolean[];

  constructor(private $document: JQuery, private workingMode: WorkingMode) {
    this.successItems = [];
  }

  toggleFavesOnPage(forceState?: boolean): Promise<boolean[]> {
    this.successItems.length = 0;
    let $buttons: JQuery[];

    if (forceState == true) {
      //find unfaved items and fave them
      $buttons = this.getUnfavedButtons();
    } else {
      $buttons = this.getFavedButtons();
    }

    console.log("[ItemFaver]: Found", $buttons.length, "items to click on.");

    return $buttons.reduce((sequence, btn) => {
      // Add these actions to the end of the sequence
      return sequence.then(() => {
        return this.toggleItemFave(btn, forceState);
      });
    }, Promise.resolve());
  }

  toggleItemFave($button: JQuery, state?: boolean): Promise<boolean> {
    if (state) {
      state = true;
    }
    else {
      state = false;
    }
    console.log("[ItemFaver]", moment().format("HH:mm:ss"), "Toggling item fave state to", state);
    return new Promise<boolean>((resolve, reject) => {
      if (!state) {
        $button.click();
        this.successItems.push(true);
        resolve(true);
        return;
      }
      Database.canFaveMoreItems().then((result) => {
        if (result == true) {
          setTimeout(() => {
            $button.click();
            Database.saveFave(new Date()).then(() => {
              this.successItems.push(true);
              resolve(true);
            });
          }, Globals.delayBetweenFaves())
        }
        else {
          this.successItems.push(false);
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
