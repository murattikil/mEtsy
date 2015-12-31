/// <reference path="../../typings/jquery/jquery.d.ts"/>

class ItemFaver {
  successItems: boolean[];

  constructor(private workingMode: WorkingMode) {
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
          return;
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
}
