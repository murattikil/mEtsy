/// <reference path="../typings/chrome/chrome.d.ts"/>

class Content extends MessageHandler {
  private messageHandler: MessageHandler;
  constructor() {
    this.hookPageLoaded();
    super();
  }

  hookPageLoaded() {
    $(document).ready(() => {
      this.sendMessage(<IRuntimeMessage>{
        type: IRuntimeMessageType.DocumentReady,
        payload: {
        }
      })
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

  public getType() : string{
    return "Content";
  }
}
console.log("[Content]: Content loaded");
var content = new Content();
