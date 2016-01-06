/// <reference path="../../typings/jquery/jquery.d.ts"/>

class ItemFaver {
  successItems: boolean[];

  constructor() {
    this.successItems = [];
  }

  toggleButtons($buttons: JQuery[], saveEachFave: boolean): Promise<boolean> {
    console.log("[ItemFaver]: Toggling", $buttons.length, "buttons. Saving in DB?", saveEachFave);

    return $buttons.reduce((sequence, btn) => {
      // Add these actions to the end of the sequence
      return sequence.then((res) => {
        if (res) {
          return this.toggleItemFave(btn, saveEachFave);
        }
        else {
          return false;
        }
      });
    }, Promise.resolve(true));
  }

  toggleItemFave($button: JQuery, save?: boolean): Promise<boolean> {
    save = save ? save : false;
    console.log("[ItemFaver]: At", moment().format("HH:mm:ss"), "toggling item fave state to", save);
    return new Promise<boolean>((resolve, reject) => {
      if (!save) {
        $button.click();
        resolve(true);
        return;
      }
      Database.canFaveMoreItems().then((canFaveMore) => {
        if (canFaveMore) {
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
}
