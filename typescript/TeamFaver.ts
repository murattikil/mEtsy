/// <reference path="../typings/jquery/jquery.d.ts"/>

class TeamFaver {
  next: INext;
  itemFaver: ItemFaver;

  constructor() {
    console.log("[TeamFaver]: New Team object created.");
  }

  start(): void {
    //this must run on client
    let doc = $(document);
    this.itemFaver = new ItemFaver($(document), WorkingMode.TeamFaving);

    this.doFaving();
  }

  private doFaving(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.itemFaver.toggleFavesOnPage(false).then(() => {
        this.itemFaver.toggleFavesOnPage(true).then((result) => {
          let allPassed = result.every((item) => {
            return item;
          });
          console.log("[TeamFaver]: Faving page finished. All passed?", allPassed);
          if (allPassed && this.goNextPage()) {
            console.log("[TeamFaver]: Going to the next page.");
          }
        });
      });
    });
  }

  private goNextPage(): boolean {
    var $current = $(".pager .pages a.current-page");
    let $next = $current.parent().next().find("a");

    if ($next.length > 0) {
      window.location.href = $next.attr("href");
      return true;
    }
    else {
      return false;
    }
  }

  // startOnContent(): void {
  //   let msg : IRuntimeMessage = {
  //     type: IRuntimeMessageType.Fave
  //   }
  //   this.messageHandler.sendMessage()
  // }
}
