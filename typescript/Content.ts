/// <reference path="../typings/chrome/chrome.d.ts"/>

class Content extends MessageHandler {
  private messageHandler: MessageHandler;
  constructor() {
    // this.hookPageLoaded();
    super();
    this.showMenu();
  }

  private hookPageLoaded() {
    $(document).ready(() => {
      this.sendMessage(<IRuntimeMessage>{
        type: IRuntimeMessageType.DocumentReady,
        payload: {
        }
      })
    });
  }

  public hookFavesTrackChanged() {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      var favesTrackChange = changes["favesTrack"];
      if (favesTrackChange) {
        let newValue : IFavesTrack = JSON.parse(favesTrackChange.newValue);
        $("#lblFavesThisHour").text(Mustache.render("Faves this hour {{ count }}/{{ max }}", { count: newValue.count, max: Globals.maxFavesPerHour }));
      }
    });
  }

  private sendDocumentReady(): void {
    this.sendMessage(<IRuntimeMessage>{
      type: IRuntimeMessageType.DocumentReady,
      payload: {
      }
    });
  }

  private showMenu(): void {
    $.get(chrome.extension.getURL('/views/content.html'), (data) => {
      $($.parseHTML(data)).appendTo('body');
      this.hookContentMenuEvents();
      Database.getFavesCountThisHour().then((count) => {
        $("#lblFavesThisHour").text(Mustache.render("Faves this hour {{ count }}/{{ max }}", { count: count, max: Globals.maxFavesPerHour }));
      });
    });
  }

  private hookContentMenuEvents(): void {
    var $cm = $(".content-menu");
    $cm.find("#btn-start").click(() => {
      this.sendDocumentReady();
    });
    this.hookFavesTrackChanged();
  }

  continue(msg: IRuntimeMessage, sender: chrome.runtime.MessageSender) {
    switch (msg.type) {
      case IRuntimeMessageType.TeamFaver:
        let teamFaver = new TeamFaver();
        teamFaver.start();
        break;

      default:
        break;
    }
  }

  public getType(): string {
    return "Content";
  }
}
console.log("[Content]: Content loaded");
var content = new Content();
