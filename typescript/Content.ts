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
    });
  }

  private hookContentMenuEvents(): void {
    var $cm = $(".content-menu");
    $cm.find("#btn-start").click(() => {
      this.sendDocumentReady();
    });
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
